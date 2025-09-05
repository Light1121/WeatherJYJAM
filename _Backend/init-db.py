from app import create_app
from app._utils.db import init_db

print("Loading init-db.py...")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        init_db()
        print("Database initialized (no tables created).")
