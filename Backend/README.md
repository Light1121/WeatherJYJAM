# WeatherJYJAM Backend

A Flask REST API backend with MVC architecture, JWT authentication, and SQLAlchemy ORM.

## Setup

### 1. Create Virtual Environment
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Configuration
Create a `.env.local` file in the Backend directory:
```bash
FLASK_APP_NAME=WeatherJYJAM_app
FLASK_ENV=development
JWT_SECRET_KEY=your-secret-key-change-in-production
```

### 4. Run Server
```bash
python server.py
```

The server will start on `http://localhost:2333` and automatically create the database.

## API Endpoints

### Authentication API

Base URL: `http://localhost:2333/api/auth`

- **POST** `/api/auth/register` - Register new user
  ```bash
  curl -X POST http://localhost:2333/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test User",
      "email": "test@example.com", 
      "password": "password123"
    }'
  ```

- **POST** `/api/auth/login` - User login (returns JWT token)
  ```bash
  curl -X POST http://localhost:2333/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "test@example.com",
      "password": "password123"
    }'
  ```
  
  Response:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
      "uid": "user-uuid",
      "name": "Test User",
      "email": "test@example.com"
    }
  }
  ```

- **POST** `/api/auth/logout` - User logout
  ```bash
  curl -X POST http://localhost:2333/api/auth/logout
  ```

### User Profile API (JWT Required)

Base URL: `http://localhost:2333/api/me`

- **GET** `/api/me/` - Get current user profile
  ```bash
  curl -X GET http://localhost:2333/api/me/ \
    -H "Authorization: Bearer YOUR_JWT_TOKEN"
  ```

### Tabs API (JWT Required)

Base URL: `http://localhost:2333/api/my`

- **GET** `/api/my/tabs` - Get current user's tabs
  ```bash
  curl -X GET http://localhost:2333/api/my/tabs \
    -H "Authorization: Bearer YOUR_JWT_TOKEN"
  ```

- **PUT** `/api/my/tabs` - Update current user's tabs
  ```bash
  curl -X PUT http://localhost:2333/api/my/tabs \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "tabs": [
        {
          "tab_name": "My Tab",
          "map": {"center": [0, 0], "zoom": 5},
          "pin": {"location": [0, 0]}
        }
      ]
    }'
  ```

- **GET** `/api/my/tabs/{tab_id}` - Get specific tab
  ```bash
  curl -X GET http://localhost:2333/api/my/tabs/1 \
    -H "Authorization: Bearer YOUR_JWT_TOKEN"
  ```

- **PUT** `/api/my/tabs/{tab_id}` - Update specific tab
  ```bash
  curl -X PUT http://localhost:2333/api/my/tabs/1 \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "tab_name": "Updated Tab Name",
      "map": {"center": [1, 1], "zoom": 10}
    }'
  ```

- **DELETE** `/api/my/tabs/{tab_id}` - Delete specific tab
  ```bash
  curl -X DELETE http://localhost:2333/api/my/tabs/1 \
    -H "Authorization: Bearer YOUR_JWT_TOKEN"
  ```

### Weather API

- **GET** `/api/weather/` - Get all weather stations
- **GET** `/api/weather/{station_name}` - Get weather data by station
- **GET** `/api/weather/avg_{station_name}` - Get average weather data
- **GET** `/api/weather/nearest?lat={lat}&lng={lng}` - Get nearest station

### Search API

- **GET** `/api/search?q={query}` - Search weather stations
- **POST** `/api/search/ai` - AI search with streaming

## Data Storage

User data is stored in SQLite database at `./instance/weather_app.db`

The database is automatically created when you first run the server.

## Architecture

- **SQLAlchemy ORM**: Database models and relationships
- **bcrypt**: Password hashing and verification
- **Flask-RESTX**: API endpoints with auto-documentation
- **Flask-CORS**: Cross-origin resource sharing
- **Flask-JWT-Extended**: JWT authentication and authorization
- **OpenAI API**: AI-powered search functionality

## Project Structure

```
_Backend/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── database.py          # SQLAlchemy configuration
│   └── user/
│       ├── __init__.py
│       ├── model.py         # User SQLAlchemy model
│       ├── schema.py        # Data validation schemas
│       ├── service.py       # Business logic layer
│       └── controller.py    # REST API endpoints
├── instance/
│   └── weather_app.db       # SQLite database (auto-created)
├── requirements.txt         # Dependencies
├── server.py               # Application entry point
├── Procfile          # web: python server.py
└── runtime.txt       # python-3.11.10
```




## Database Creation Logic

1. **App Initialization** (`app/__init__.py`):
   - Loads environment variables
   - Sets database path to `instance/weather_app.db`
   - Calls `init_db(app)`

2. **Database Setup** (`app/database.py`):
   - Creates `instance/` folder if needed
   - Configures SQLAlchemy with SQLite URI
   - Calls `db.create_all()` to create tables

3. **Model Registration**:
   - SQLAlchemy automatically discovers models imported in the app
   - `User` model defines the database schema
   - Tables created based on SQLAlchemy model definitions

4. **No Manual Migration Needed**:
   - Database and tables are created automatically on first run
   - Schema changes require manual migration or database reset