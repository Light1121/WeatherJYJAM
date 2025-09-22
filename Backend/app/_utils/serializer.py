from typing import Dict, Any


def to_dict(user) -> Dict[str, Any]:
    """Convert user object to dictionary for backward compatibility"""
    # Use the model's built-in to_dict method if available
    if hasattr(user, 'to_dict'):
        return user.to_dict()
    
    # Fallback for legacy compatibility
    return {
        "user_id": getattr(user, 'user_id', None),
        "username": getattr(user, 'username', ''),
        "email": getattr(user, 'email', ''),
        "created_at": getattr(user, 'created_at', None).isoformat() if getattr(user, 'created_at', None) else None
    }
