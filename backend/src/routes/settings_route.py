from fastapi import APIRouter, HTTPException, status, Depends, Response
from fastapi.security import APIKeyCookie
from dependencies.current_user import get_current_user
from dependencies.token import authenticate_user_access_token
from utils.database_utils import database

settings_router = APIRouter()

@settings_router.post("/api/users/settings/details")
def get_details_user(user = Depends(get_current_user)):

    user_detail = {
        "username": user["username"],
        "email": user["email"],
        "password": '***************'
    }

    return HTTPException(status_code=status.HTTP_200_OK, detail=user_detail)

access_token_key = APIKeyCookie(name="access_token")

#logout user (removing cookie)
@settings_router.post("/api/users/settings/logout")
def logout_user_route(response: Response, credentials = Depends(authenticate_user_access_token), token = Depends(access_token_key)):

    token_expired = {
        "exp": credentials["decoded_token"]["exp"],
        "token": token
    }

    database.collection_expired_tokens_user.insert_one(token_expired)
    
    response.delete_cookie(key="access_token", httponly=True, secure=True)

    return HTTPException(status_code=status.HTTP_200_OK, detail="Successfully Logout!")
