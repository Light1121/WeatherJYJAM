from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class UserSchema(BaseModel):
    """Basic user schema"""
    user_id: str
    username: str
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True