from typing import Optional, Dict, Any
from pydantic import BaseModel


class TabBase(BaseModel):
    """Base tab schema"""
    tab_name: str
    map: Optional[Dict[str, Any]] = None
    pin: Optional[Dict[str, Any]] = None


class TabCreate(TabBase):
    """Schema for creating a tab"""
    pass


class TabUpdate(BaseModel):
    """Schema for updating a tab (all fields optional)"""
    tab_name: Optional[str] = None
    map: Optional[Dict[str, Any]] = None
    pin: Optional[Dict[str, Any]] = None


class TabResponse(TabBase):
    """Schema for tab response"""
    id: int
    uid: str
    
    class Config:
        from_attributes = True


class TabListResponse(BaseModel):
    """Schema for list of tabs"""
    tabs: list[TabResponse]
    total: int
