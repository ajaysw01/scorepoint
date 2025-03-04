from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from src.api.database.db_conn import get_db
from src.api.models.models import User
from src.api.auth.jwt_token import verify_token
from src.api.customexception.exceptions import AuthException

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = verify_token(token)
        email: str = payload.get("sub")

        if not email:
            raise AuthException("Invalid token payload")

        user = db.query(User).filter(User.email == email).first()
        if user is None:
            raise AuthException("User not found")

        return user

    except AuthException as e:
        raise e
    except Exception as e:
        raise AuthException("Could not validate credentials") from e
