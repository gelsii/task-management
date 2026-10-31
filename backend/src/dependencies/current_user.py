from dependencies.token import authenticate_user_access_token
from fastapi import Depends, HTTPException, status
from utils.database_utils import database
from bson.objectid import ObjectId

def get_current_user(decoded_token = Depends(authenticate_user_access_token)):

    user_founded = database.collection_users.find_one({ "_id": ObjectId(decoded_token["decoded_token"]["_id"]) }, { "password": 0, "_id": 0 })

    if user_founded == None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized Credentials... Please signin first.")

    
    return user_founded