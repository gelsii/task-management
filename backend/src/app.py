from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_route import auth_router
from routes.settings_route import settings_router
from routes.tasks_route import task_router
from datetime import datetime

app = FastAPI()

originCors = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(CORSMiddleware, allow_credentials=True, allow_origins=originCors, allow_headers=["*"], allow_methods=["*"])

app.include_router(router=auth_router)
app.include_router(router=settings_router)
app.include_router(router=task_router)

print(int(datetime.now().timestamp()))