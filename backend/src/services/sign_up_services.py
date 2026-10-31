from fastapi import HTTPException, status
from models.user_models import SignUnUserModel
import bcrypt
from utils.database_utils import database


def sign_up_user_action(client: SignUnUserModel) -> None: 

    is_found_user = database.collection_users.find_one({ "email": client.email })
    

    if is_found_user != None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="already used the email.")

    salt_hashing = bcrypt.gensalt(rounds=15)
    
    hashed_password = bcrypt.hashpw(password=client.password.encode(), salt=salt_hashing)

    user_created = {
        "username": client.username,
        "email": client.email,
        "password": hashed_password,
    }

    try: 
        database.collection_users.insert_one(document=user_created)
    except Exception as error:
        print(error)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to sign up... Please try again.")
    