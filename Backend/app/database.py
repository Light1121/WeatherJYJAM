import os
from flask_sqlalchemy import SQLAlchemy
from google.cloud.sql.connector import Connector, IPTypes
import pymysql
import sqlalchemy

db = SQLAlchemy()

#Connection to database
def connect_with_connector() -> sqlalchemy.engine.base.Engine:
    """
    Initializes a connection pool for a Cloud SQL instance of MySQL.

    Uses the Cloud SQL Python Connector package.
    """

    instance_connection_name = "esoteric-life-470902-k9:australia-southeast2:jyjam-weatherdata-db"
    db_user = "admin" 
    db_pass = "Password1!"
    db_name ="weather_data_database"

    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC

    # initialize Cloud SQL Python Connector object
    connector = Connector(ip_type=ip_type, refresh_strategy="LAZY")

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
    )
    return pool

def init_db(app):
    """Initialize database with SQLAlchemy (supports Cloud SQL and SQLite)."""

    # use_cloud_sql = os.getenv("USE_CLOUD_SQL", "false").lower() == "true"
    use_cloud_sql = True

    if use_cloud_sql:
        # Use Cloud SQL connection
        engine = connect_with_connector()
        app.config["SQLALCHEMY_DATABASE_URI"] = str(engine.url)
        app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"creator": engine.raw_connection}
    else:
        # Local development (SQLite fallback)
        db_path = app.config.get('DATABASE_PATH', './instance/weather_app.db')
        if not os.path.isabs(db_path):
            db_path = os.path.abspath(db_path)
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()


def _init_db(app):
    """Initialize database with SQLAlchemy"""
    db_path = app.config.get('DATABASE_PATH', './instance/weather_app.db')
    
    if not os.path.isabs(db_path):
        db_path = os.path.abspath(db_path)
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()