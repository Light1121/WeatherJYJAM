from dataclasses import dataclass
from typing import Optional
from datetime import datetime


@dataclass
class User:
    # User model class for data structure definition
    user_id: Optional[str] = None
    username: str = ""
    email: str = ""
    password: str = ""
    created_at: Optional[datetime] = None
