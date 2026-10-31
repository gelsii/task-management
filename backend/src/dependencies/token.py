from dotenv import load_dotenv
import jwt
import os
from datetime import datetime, timedelta
from fastapi.security import APIKeyCookie
from fastapi import HTTPException, status, Depends, Response
from utils.database_utils import database

default_private_access_token_key = os.getenv("PRIVATE_ACCESS_TOKEN_KEY")
default_algorithm_token = os.getenv("ALGORITHM_ACCESS_TOKEN")
expired_access_token = 30


def generate_token(additional_detail: dict, other_key: str = None):

    payload_token ={
        "exp": datetime.utcnow() + timedelta(minutes=expired_access_token),
        **additional_detail
    }

    generated_token = jwt.encode(payload=payload_token, key=default_private_access_token_key or other_key, algorithm=default_algorithm_token)

    return { "access_token": generated_token }

access_token_cookie = APIKeyCookie(name="access_token")

def authenticate_user_access_token(response: Response, token: str = Depends(access_token_cookie)):

    forbidden_access_token_exeption = HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have permission to access this page.")

    date_now = int(datetime.now().timestamp())
    
    database.collection_expired_tokens_user.delete_one({ "exp": {"$lte": date_now }  })

    token_expires = database.collection_expired_tokens_user.find_one({ "token": token })

    if token_expires != None:
        raise forbidden_access_token_exeption

    try:
        decoded_token = jwt.decode(jwt=token, key=default_private_access_token_key, algorithms=[f"{default_algorithm_token}"])

    except jwt.ExpiredSignatureError:

        raise forbidden_access_token_exeption

    except jwt.InvalidSignatureError:

        response.delete_cookie(key="access_token", httponly=True, secure=True)

        raise forbidden_access_token_exeption

    except Exception as error:

        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=error)

    return { "decoded_token": decoded_token }