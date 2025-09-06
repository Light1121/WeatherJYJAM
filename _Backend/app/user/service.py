import os
from typing import List, Optional
from datetime import datetime

from app.user.model import User
from app._utils.csv_db import CSVDatabase
from app._utils.serializer import to_csv, from_csv, new_uuid


class UserService:
    # User service layer for business logic
    
    def __init__(self):
        # Use environment variable or default path
        csv_path = os.getenv('USER_CSV_PATH', './data/user.csv')
        self.csv_db = CSVDatabase(csv_path)
    
    def create_user(self, username: str, email: str, password: str) -> User:
        # Create new user
        user = User(
            username=username,
            email=email,
            password=password,
            created_at=datetime.now()
        )
        
        # Generate UUID for new user
        user.user_id = new_uuid()
        
        # Insert into CSV file
        csv_row = to_csv(user)
        self.csv_db.insert_row(csv_row)
        
        return user
    
    def get_user_by_id(self, user_id: str) -> Optional[User]:
        # Get user by ID
        row = self.csv_db.find_by_id(user_id)
        if row:
            return from_csv(row)
        return None
    
    def get_user_by_username(self, username: str) -> Optional[User]:
        # Get user by username
        row = self.csv_db.find_by_username(username)
        if row:
            return from_csv(row)
        return None
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        # Get user by email
        row = self.csv_db.find_by_email(email)
        if row:
            return from_csv(row)
        return None
    
    def get_all_users(self) -> List[User]:
        # Get all users
        rows = self.csv_db.read_all_rows()
        users = []
        for row in rows:
            users.append(from_csv(row))
        return users
    
    def create_dummy_user(self) -> User:
        # Create dummy user for testing
        import random
        import string
        
        # Generate random username and email
        random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
        username = f"dummy_{random_suffix}"
        email = f"dummy_{random_suffix}@example.com"
        password = "dummy_password"
        
        return self.create_user(username, email, password)
