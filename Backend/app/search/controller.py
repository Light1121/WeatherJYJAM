from flask import request, Response, stream_with_context
from flask_restx import Resource, Namespace

from app.search.service import SearchService

api = Namespace('search')
search_service = SearchService()


@api.route('')
class SearchApi(Resource):
    def get(self):
        """Search weather stations by name"""
        query = request.args.get('q', '')
        
        if not query:
            return {
                'query': query,
                'results': []
            }
        
        results = search_service.search_stations(query)
        
        return {
            'query': query,
            'results': results
        }


@api.route('/ai')
class SearchAiApi(Resource):
    def post(self):
        """AI search with SSE streaming"""
        data = request.get_json() or {}
        query = data.get('q', '')
        
        if not query:
            return {'error': 'No query provided'}, 400
        
        def generate():
            """Generator function for SSE streaming"""
            try:
                for chunk in search_service.ai_search_stream(query):
                    yield f"data: {chunk}\n\n"
                yield "data: [DONE]\n\n"
            except Exception as e:
                yield f"data: Error: {str(e)}\n\n"
        
        return Response(
            stream_with_context(generate()),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'X-Accel-Buffering': 'no'
            }
        )
