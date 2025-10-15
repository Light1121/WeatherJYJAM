import uuid
import bcrypt
from datetime import datetime
from typing import Optional

from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import db


class User(db.Model):
    """User model using SQLAlchemy ORM"""
    __tablename__ = 'users'
    
    # Primary key
    uid: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # User fields
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    
    # Relationships
    profile: Mapped[Optional["UserProfile"]] = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    tabs: Mapped[list["Tab"]] = relationship("Tab", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self) -> str:
        return f"<User(uid='{self.uid}', name='{self.name}', email='{self.email}')>"
    
    def set_password(self, password: str) -> None:
        """Hash and set password"""
        salt = bcrypt.gensalt()
        self.password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    def check_password(self, password: str) -> bool:
        """Check if provided password matches stored hash"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
    def to_dict(self) -> dict:
        """Convert model to dictionary (exclude password)"""
        return {
            'uid': self.uid,
            'name': self.name,
            'email': self.email,
        }


class UserProfile(db.Model):
    """User profile model"""
    __tablename__ = 'user_profiles'
    
    # Primary key
    uid: Mapped[str] = mapped_column(String(36), ForeignKey('users.uid'), primary_key=True)
    
    # Profile fields
    favour_tabs: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)  # tab id reference
    pic: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)  # picture URL or path
    
    # Relationship
    user: Mapped["User"] = relationship("User", back_populates="profile")
    
    def __repr__(self) -> str:
        return f"<UserProfile(uid='{self.uid}')>"
    
    def to_dict(self) -> dict:
        """Convert model to dictionary"""
        return {
            'uid': self.uid,
            'favour_tabs': self.favour_tabs,
            'pic': self.pic,
        }