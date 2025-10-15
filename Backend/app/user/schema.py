from typing import Optional, List
from pydantic import BaseModel


class UserBase(BaseModel):
    """Base user schema"""
    name: str
    email: str


class UserCreate(UserBase):
    """Schema for creating a user"""
    password: str


class UserLogin(BaseModel):
    """Schema for user login"""
    email: str
    password: str


class UserResponse(UserBase):
    """Schema for user response (no password)"""
    uid: str
    
    class Config:
        from_attributes = True


class UserProfileBase(BaseModel):
    """Base user profile schema"""
    favour_tabs: Optional[str] = None
    pic: Optional[str] = None


class UserProfileCreate(UserProfileBase):
    """Schema for creating user profile"""
    pass


class UserProfileUpdate(BaseModel):
    """Schema for updating user profile (all fields optional)"""
    favour_tabs: Optional[str] = None
    pic: Optional[str] = None


class UserProfileResponse(UserProfileBase):
    """Schema for user profile response"""
    uid: str
    
    class Config:
        from_attributes = True


class UserWithProfile(UserResponse):
    """Schema for user with profile"""
    profile: Optional[UserProfileResponse] = None
    
    class Config:
        from_attributes = True
