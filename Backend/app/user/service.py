from typing import List, Optional

from app.user.model import User
from app.database import db


class UserService:
    """User service layer for business logic"""
    
    def create_user(self, name: str, email: str, password: str) -> User:
        """Create a new user"""
        user = User(name=name, email=email)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        return user
    
    def get_user_by_id(self, uid: str) -> Optional[User]:
        """Get user by ID"""
        return db.session.get(User, uid)
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        return db.session.query(User).filter_by(email=email).first()
    
    def get_all_users(self) -> List[User]:
        """Get all users"""
        return db.session.query(User).all()
    
    def authenticate_user(self, email: str = None, password: str = None) -> Optional[User]:
        """Authenticate user by email and password"""
        if not password or not email:
            return None
        
        user = self.get_user_by_email(email)
        
        if user and user.check_password(password):
            return user
        
        return None
    
    def update_user(self, uid: str, name: str = None, email: str = None, password: str = None) -> Optional[User]:
        """Update user information"""
        user = self.get_user_by_id(uid)
        if not user:
            return None
        
        if name:
            user.name = name
        if email:
            user.email = email
        if password:
            user.set_password(password)
        
        db.session.commit()
        return user
    
    def delete_user(self, uid: str) -> bool:
        """Delete user by ID"""
        user = self.get_user_by_id(uid)
        if not user:
            return False
        
        db.session.delete(user)
        db.session.commit()
        return True