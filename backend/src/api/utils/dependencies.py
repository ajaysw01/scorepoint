from fastapi import  Depends, HTTPException, status
from src.api.models.models import User
from src.api.auth.oauth2 import  get_current_user

def require_admin(user: User = Depends(get_current_user)) -> User:
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user
