import os
from dotenv import load_dotenv

# from flask import Blueprint, Flask
# from flask_cors import CORS
# from flask_jwt_extended import JWTManager
# from flask_restx import Api

load_dotenv("./.env")

api_bp = Blueprint("api", os.getenv("FLASK_APP_NAME"), url_prefix="/api")
api = Api(api_bp)


def create_app():
    # TODO LATER
    # app = Flask(os.getenv("FLASK_APP_NAME"))
    # app.config.from_prefixed_env()
    # app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
    # app.json_encoder = CustomEncoder
    # app.config["RESTX_JSON"] = {"cls": CustomEncoder}

    # CORS
    #CORS(app)


    #app.register_blueprint(api_bp)
    #register_resources_exception_handler(api)

    #return app
    return None