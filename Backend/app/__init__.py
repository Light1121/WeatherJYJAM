# app/__init__.py
import os
from dotenv import load_dotenv
from flask import Blueprint, Flask
from flask_cors import CORS
from flask_restx import Api

from app.database import init_db
from app.user.controller import api as userapi
from app.user.controller import meapi as meapi
from app.weather.controller import api as weatherapi
from app.tabs.controller import api as tabsapi
from app.search.controller import api as searchapi

load_dotenv("./.env.local")

api_bp = Blueprint("api", os.getenv("FLASK_APP_NAME", "WeatherJYJAM_app"),url_prefix="/api",)
api = Api(api_bp)

def create_app():
    app = Flask(__name__)

    # simplest: use file path instead of URI
    app.config["DATABASE_PATH"] = os.path.join(app.instance_path, "weather_app.db")

    # other configs from environment variables
    app.config.from_prefixed_env()

    # init database
    init_db(app)

    # CORS
    CORS(app)

    # Register blueprint
    api.add_namespace(userapi)
    api.add_namespace(meapi)
    api.add_namespace(tabsapi)
    api.add_namespace(searchapi)
    api.add_namespace(weatherapi)
    app.register_blueprint(api_bp)

    return app
