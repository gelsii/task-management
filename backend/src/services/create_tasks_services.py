from fastapi import HTTPException, status
from utils.database_utils import database
from models.tasks_models import CreateTasksModel

def create_task_action(req_inputs: CreateTasksModel, user: dict):

    created_task = {
        "email": user["email"],
        "task_date": req_inputs.date,
        "task_type": req_inputs.taskType,
        "task_content": req_inputs.content,
        "task_status": "todo"
    }

    try:
        database.collection_todo_tasks.insert_one(created_task)
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
