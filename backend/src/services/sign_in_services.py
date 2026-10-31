from fastapi import HTTPException, status, Response
import bcrypt
from models.user_models import SignInUserModel
from utils.database_utils import database
from dependencies.token import generate_token, expired_access_token
from datetime import datetime, timedelta

def sign_in_user_action(user: SignInUserModel, response: Response) -> None:

    Unauthorize_exeption = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password... Please check again.")

    founded_user = database.collection_users.find_one({ "email": user.email })

    if founded_user == None:
        raise Unauthorize_exeption

    is_match_password = bcrypt.checkpw(password=user.password.encode(), hashed_password=founded_user["password"])

    if not is_match_password:
        raise Unauthorize_exeption

    generated_access_token = generate_token(additional_detail={"_id": str(founded_user["_id"]) })
        
    expired_cookie = datetime.now() + timedelta(minutes=expired_access_token)

    response.set_cookie(key="access_token", value=generated_access_token["access_token"], httponly=True, secure=True, expires=f"{expired_cookie}")
    
    