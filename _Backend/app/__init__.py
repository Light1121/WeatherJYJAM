import os
from dotenv import load_dotenv

from flask import Blueprint, Flask
from flask_cors import CORS
from flask_restx import Api

from .user.controller import api as userapi

load_dotenv("./.env")
api_bp = Blueprint("api", os.getenv("FLASK_APP_NAME", "WeatherJYJAM_app"), url_prefix="/api")
api = Api(api_bp)


def create_app():
    #app = Flask(os.getenv("FLASK_APP_NAME"))
    app = Flask(__name__)
    app.config.from_prefixed_env()

    api.add_namespace(userapi)

    # CORS
    CORS(app)

    # Register blueprint
    app.register_blueprint(api_bp)

    return app