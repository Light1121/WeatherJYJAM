import uuid
from typing import Optional

from sqlalchemy import String, Integer, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import db


class Tab(db.Model):
    """Tab model using SQLAlchemy ORM"""
    __tablename__ = 'tabs'
    
    # Primary key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    
    # Foreign key
    uid: Mapped[str] = mapped_column(String(36), ForeignKey('users.uid'), nullable=False, index=True)
    
    # Tab fields
    tab_name: Mapped[str] = mapped_column(String(100), nullable=False)
    map: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # JSON field for map data
    pin: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # JSON field for pin data
    
    # Relationship
    user: Mapped["User"] = relationship("User", back_populates="tabs")
    
    def __repr__(self) -> str:
        return f"<Tab(id={self.id}, uid='{self.uid}', tab_name='{self.tab_name}')>"
    
    def to_dict(self) -> dict:
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'uid': self.uid,
            'tab_name': self.tab_name,
            'map': self.map,
            'pin': self.pin,
        }
