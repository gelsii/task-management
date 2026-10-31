from pydantic import BaseModel
from fastapi import Form

class SignUnUserModel(BaseModel):
    username: str
    email: str
    password: str

class SignInUserModel(BaseModel):
    email: str
    password: str