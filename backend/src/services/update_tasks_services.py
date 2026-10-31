from fastapi import HTTPException, status
from utils.database_utils import database
from bson.objectid import ObjectId

def update_status_tasks_action(current_status: str, status_req: str, req_id: str):

    exeption_none_case = HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong.")

    if current_status == status_req:
        raise exeption_none_case
    
    match current_status:
        case "todo":
            founded_task = database.collection_todo_tasks.find_one({ "_id": ObjectId(req_id) })
        case "in_progress":
            founded_task = database.collection_in_progress_tasks.find_one({ "_id": ObjectId(req_id) })
        case "in_review":
            founded_task = database.collection_in_review_tasks.find_one({ "_id": ObjectId(req_id) })
        case "done":
            founded_task = database.collection_done_tasks.find_one({ "_id": ObjectId(req_id) })
        case _:
            raise exeption_none_case

    if founded_task == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found... Please check again.")

    match status_req:
        case "todo":
            founded_task = database.collection_todo_tasks.insert_one(founded_task)
        case "in_progress":
            founded_task = database.collection_in_progress_tasks.insert_one(founded_task)
        case "in_review":
            founded_task = database.collection_in_review_tasks.insert_one(founded_task)
        case "done":
            founded_task = database.collection_done_tasks.insert_one(founded_task)
        case _:
            raise exeption_none_case

    match current_status:
        case "todo":
            founded_task = database.collection_todo_tasks.delete_one({ "_id": ObjectId(req_id) })
        case "in_progress":
            founded_task = database.collection_in_progress_tasks.delete_one({ "_id": ObjectId(req_id) })
        case "in_review":
            founded_task = database.collection_in_review_tasks.delete_one({ "_id": ObjectId(req_id) })
        case "done":
            founded_task = database.collection_done_tasks.delete_one({ "_id": ObjectId(req_id) })
        case _:
            raise exeption_none_case

    

    
