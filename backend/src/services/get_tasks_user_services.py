from fastapi import APIRouter, HTTPException, status, Depends, Response
from dependencies.current_user import get_current_user
from utils.database_utils import database

def get_task_user_action(status_task: str, user: dict):
    match status_task:
        case "todo": 
            tasks_founded = database.collection_todo_tasks.find({ "email": user["email"] })

        case "in_progress": 
            tasks_founded = database.collection_in_progress_tasks.find({ "email": user["email"] })

        case "in_review": 
            tasks_founded = database.collection_in_review_tasks.find({ "email": user["email"] })

        case "done": 
            tasks_founded = database.collection_done_tasks.find({ "email": user["email"] })

        case _:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found... Please check.")


    all_tasks = [ ]

    for task in list(tasks_founded):
        task["_id"] = str(task["_id"])
        all_tasks.append(task)
    
    if not all_tasks:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task Not Found.")

    return all_tasks