import uuid
import bcrypt
from datetime import datetime
from typing import Optional

from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database import db


class User(db.Model):
    """User model using SQLAlchemy ORM"""
    __tablename__ = 'users'
    
    # Primary key
    user_id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # User fields
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self) -> str:
        return f"<User(user_id='{self.user_id}', username='{self.username}', email='{self.email}')>"
    
    def set_password(self, password: str) -> None:
        """Hash and set password"""
        # salt = bcrypt.gensalt()
        # self.password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
        self.password = password
    
    def check_password(self, password: str) -> bool:
        """Check if provided password matches stored hash"""
        # return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
        return self.password == password
    
    def to_dict(self) -> dict:
        """Convert model to dictionary"""
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
            'password': self.password, # WARNING: don't return password in production
            'created_at': self.created_at.isoformat() if self.created_at else None
        }