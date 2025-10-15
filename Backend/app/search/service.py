import os
import json
from typing import List, Generator
from decimal import Decimal

from sqlalchemy import text as sqlalchemy_text
from app.database import db
from app.search.prompt import SYSTEM_PROMPT
from app.search.tools import geocode_location, fetch_open_meteo


class SearchService:
    """Search service layer for business logic"""
    
    def search_stations(self, query: str) -> List[str]:
        """
        Search for weather stations by name
        Returns a list of unique station names with state (format: "Station Name, State")
        """
        if not query:
            return []
        
        sql_query = """
            SELECT DISTINCT
                `Station Name`,
                state
            FROM
                stations
            WHERE
                `Station Name` LIKE :query
            ORDER BY
                `Station Name` ASC
            LIMIT 50
        """
        
        with db.engine.connect() as conn:
            result = conn.execute(
                sqlalchemy_text(sql_query), 
                {"query": f"%{query}%"}
            )
            rows = result.mappings().all()
        
        # Format as "Station Name, State"
        formatted_results = [
            f"{row['Station Name']}, {row['state']}" 
            for row in rows
        ]
        
        return formatted_results
    
    def ai_search_stream(self, query: str) -> Generator[str, None, None]:
        """
        Two-stage tool calling:
        1) non-stream call to decide tool(s)
        2) call tool(s) in Python, then stream final answer with tool results
        """
        try:
            from openai import OpenAI
            
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                yield "Error: OPENAI_API_KEY not set in environment variables"
                return

            client = OpenAI(api_key=api_key)

            # Tool definitions for the AI model
            tools = [
                {
                    "type": "function",
                    "function": {
                        "name": "get_live_weather",
                        "description": "Get current weather and hourly forecast for a location name using online sources.",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "location": {"type": "string", "description": "City or place name, e.g. 'Melbourne'"},
                            },
                            "required": ["location"],
                        },
                    },
                },
            ]

            # First API call: determine if tools are needed
            first = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": query},
                ],
                tools=tools,
                tool_choice="auto",
                temperature=0.3,
                stream=False,
            )

            msgs = [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": query},
            ]

            # If tools are needed, execute them on the backend
            if first.choices[0].finish_reason == "tool_calls":
                for tool_call in first.choices[0].message.tool_calls:
                    if tool_call.function.name == "get_live_weather":
                        args = json.loads(tool_call.function.arguments or "{}")
                        location = args.get("location") or query
                        
                        # Geocode location
                        geo = geocode_location(location)
                        if not geo:
                            tool_result = {"error": f"Cannot geocode '{location}'."}
                        else:
                            # Fetch weather data
                            data = fetch_open_meteo(geo["lat"], geo["lon"])
                            tool_result = {
                                "location_input": location,
                                "resolved_location": geo,
                                "provider": "open-meteo",
                                "data": data,
                            }

                        # Append tool results back to messages
                        msgs.append({
                            "role": "assistant",
                            "tool_calls": [{
                                "id": tool_call.id,
                                "type": "function",
                                "function": {"name": "get_live_weather", "arguments": json.dumps(args)}
                            }]
                        })
                        msgs.append({
                            "role": "tool",
                            "tool_call_id": tool_call.id,
                            "content": json.dumps(tool_result),
                        })
            else:
                # If no tools needed, use the first response directly
                if first.choices[0].message.content:
                    msgs.append({"role": "assistant", "content": first.choices[0].message.content})

            # Second API call: generate final answer with tool results (streaming)
            stream = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=msgs,
                temperature=0.5,
                stream=True,
            )

            for chunk in stream:
                delta = chunk.choices[0].delta
                if delta and delta.content:
                    content = delta.content
                    yield content
                    
        except Exception as e:
            yield f"Error: {str(e)}"