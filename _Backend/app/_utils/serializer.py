from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid


class UserSerializer:
    # Unified serialization utility for User objects
    
    @staticmethod
    def to_dict(user) -> Dict[str, Any]:
        # Convert user object to dictionary
        return {
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email,
            "password": user.password,
            "created_at": user.created_at.isoformat() if user.created_at else None
        }
    
    @staticmethod
    def from_dict(data: Dict[str, Any]):
        # Create user object from dictionary
        from app.user.model import User
        
        created_at = None
        if data.get('created_at'):
            created_at = datetime.fromisoformat(data['created_at'])
                
        return User(
            user_id=data.get('user_id'),
            username=data.get('username', ''),
            email=data.get('email', ''),
            password=data.get('password', ''),
            created_at=created_at
        )
    
    @staticmethod
    def to_csv_row(user) -> List[str]:
        # Convert user object to CSV row data
        return [
            user.user_id if user.user_id else '',
            user.username,
            user.email,
            user.password
        ]
    
    @staticmethod
    def from_csv_row(row: List[str], user_id: Optional[str] = None):
        # Create user object from CSV row data
        from app.user.model import User
        
        return User(
            user_id=user_id or row[0] if row[0] else None,
            username=row[1] if len(row) > 1 else '',
            email=row[2] if len(row) > 2 else '',
            password=row[3] if len(row) > 3 else '',
            created_at=datetime.now()
        )
    
    @staticmethod
    def generate_uuid() -> str:
        # Generate new UUID for user
        return str(uuid.uuid4())


# Quick access functions for one-line usage
def to_dict(user) -> Dict[str, Any]:
    return UserSerializer.to_dict(user)

def from_dict(data: Dict[str, Any]):
    return UserSerializer.from_dict(data)

def to_csv(user) -> List[str]:
    return UserSerializer.to_csv_row(user)

def from_csv(row: List[str], user_id: Optional[str] = None):
    return UserSerializer.from_csv_row(row, user_id)

def new_uuid() -> str:
    return UserSerializer.generate_uuid()
