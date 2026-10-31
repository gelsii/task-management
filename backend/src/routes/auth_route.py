from fastapi import APIRouter, HTTPException, status, Form, Depends, Response
from models.user_models import SignUnUserModel, SignInUserModel
from services.sign_up_services import sign_up_user_action
from services.sign_in_services import sign_in_user_action
from dependencies.token import authenticate_user_access_token

auth_router = APIRouter()

@auth_router.post("/api/users/signup")
def sign_up_route(user: SignUnUserModel = Form()):

    sign_up_user_action(client=user)

    return HTTPException(status_code=status.HTTP_201_CREATED, detail="Successfully Sign Up! You can now Sign In!")

@auth_router.post("/api/users/signin")
def sign_in_user_route(response: Response, user_signing_in: SignInUserModel = Form()):

    sign_in_user_action(user=user_signing_in, response=response)

    return HTTPException(status_code=status.HTTP_202_ACCEPTED, detail="Successfully Signed!")


@auth_router.post("/api/users/access")
def user_dashboard_access(decoded: dict = Depends(authenticate_user_access_token)):
    
    return HTTPException(status_code=status.HTTP_202_ACCEPTED, detail=decoded)