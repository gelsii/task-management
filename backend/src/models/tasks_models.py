from pydantic import BaseModel
from fastapi import Form

class CreateTasksModel(BaseModel):
    date: str
    content: str
    taskType: str