# WeatherJYJAM Backend

A simple Flask REST API backend with MVC architecture for user management using CSV database.

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

### 3. Run Server
```bash
python server.py
```

The server will start on `http://localhost:2333`

## API Endpoints

### Users

- **GET** `/api/users/` - Get all users
- **POST** `/api/users/` - Create new user
  ```json
  {
    "username": "testuser",
    "email": "test@example.com", 
    "password": "password123"
  }
  ```
- **POST** `/api/users/dummy` - Create dummy user for testing
- **GET** `/api/users/{id}` - Get user by ID

## Data Storage

User data is stored in CSV format at `./data/user.csv`

## Project Structure

```
_Backend/
├── app/
│   ├── user/
│   │   ├── model.py      # User data model
│   │   ├── service.py    # Business logic
│   │   └── controller.py # API endpoints
│   └── _utils/
│       └── csv_db.py     # CSV database utilities
├── data/
│   └── user.csv          # User data storage
├── requirements.txt      # Dependencies
└── server.py            # Application entry point
```
