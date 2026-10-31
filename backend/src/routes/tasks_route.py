from fastapi import APIRouter, HTTPException, status, Depends, Response
from dependencies.current_user import get_current_user
from services.get_tasks_user_services import get_task_user_action
from models.tasks_models import CreateTasksModel
from services.create_tasks_services import create_task_action
from services.update_tasks_services import update_status_tasks_action
from services.delete_tasks_services import delete_task_action

task_router = APIRouter()

# get tasks by status (get)
@task_router.get('/api/users/tasks')
def get_tasks_user_route(status_task: str, user = Depends(get_current_user)):

    all_tasks_user = get_task_user_action(status_task=status_task, user=user)

    return HTTPException(status_code=status.HTTP_200_OK, detail=all_tasks_user)

# create task (post)
@task_router.post('/api/users/tasks')
def create_task_route(from_client: CreateTasksModel, user = Depends(get_current_user)):

    create_task_action(req_inputs=from_client, user=user)

    return HTTPException(status_code=status.HTTP_201_CREATED, detail="Successfully created new task!")

# update status task (put or patch)
@task_router.put("/api/users/tasks")
def update_status_task_route(current_status: str, status_req: str, id: str, user = Depends(get_current_user)):

    update_status_tasks_action(current_status=current_status, status_req=status_req, req_id=id)

    return HTTPException(status_code=status.HTTP_201_CREATED, detail=f"Successfully moved to {status_req}")

# delete task (delete)
@task_router.delete("/api/users/tasks")
def delete_tasks_user_route(task_id: str, status_task: str, user = Depends(get_current_user)):

    delete_task_action(req_id=task_id, req_status=status_task, user=user)

    return HTTPException(status_code=status.HTTP_200_OK, detail="Successfully deleted a task!")