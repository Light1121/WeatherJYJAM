import os
from flask_sqlalchemy import SQLAlchemy
from google.cloud.sql.connector import Connector, IPTypes
import pymysql
import sqlalchemy
import json, os
from google.oauth2 import service_account

db = SQLAlchemy()



def connect_with_connector() -> sqlalchemy.engine.base.Engine:
    """Initializes a secure connection pool for Cloud SQL (MySQL)."""

    instance_connection_name = os.getenv("INSTANCE_CONNECTION_NAME")
    db_user = os.getenv("DB_USER")
    db_pass = os.getenv("DB_PASS")
    db_name = os.getenv("DB_NAME")

    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC

    if "GOOGLE_APPLICATION_CREDENTIALS" in os.environ and os.path.exists(os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "")):
        credentials = service_account.Credentials.from_service_account_file(
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
        )
    elif "SERVICE_ACCOUNT_JSON" in os.environ:
        creds_info = json.loads(os.environ["SERVICE_ACCOUNT_JSON"])
        credentials = service_account.Credentials.from_service_account_info(creds_info)
    else:
        credentials = None
    
    connector = Connector(ip_type=ip_type, credentials=credentials)

    def getconn() -> pymysql.connections.Connection:
        conn: pymysql.connections.Connection = connector.connect(
            instance_connection_name,
            "pymysql",
            user=db_user,
            password=db_pass,
            db=db_name,
        )
        return conn

    pool = sqlalchemy.create_engine(
        "mysql+pymysql://",
        creator=getconn,
        pool_pre_ping=True,
        pool_recycle=300,
    )
    return pool


def init_db(app):
    """Initialize SQLAlchemy for Flask, with Cloud SQL support."""

    use_cloud_sql = os.getenv("USE_CLOUD_SQL", "true").lower() == "true"

    print("\n" + "="*60)
    if use_cloud_sql:
        instance_name = os.getenv("INSTANCE_CONNECTION_NAME", "N/A")
        db_name = os.getenv("DB_NAME", "N/A")
        print("🌐 DATABASE: Google Cloud SQL (MySQL)")
        print(f"   Instance: {instance_name}")
        print(f"   Database: {db_name}")
        
        engine = connect_with_connector()
        app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://"
        app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"creator": engine.raw_connection}
    else:
        db_path = app.config.get("DATABASE_PATH", "./instance/weather_app.db")
        if not os.path.isabs(db_path):
            db_path = os.path.abspath(db_path)
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        print("💾 DATABASE: Local SQLite")
        print(f"   Path: {db_path}")
        
        app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
    
    print("="*60 + "\n")

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()
