from fastapi import HTTPException, status
from utils.database_utils import database
from bson.objectid import ObjectId


def delete_task_action(req_id: str, req_status: str, user: dict):

    match req_status:
        case "todo":
            database.collection_todo_tasks.find_one_and_delete({ "$and": [ 
                { "_id": ObjectId(req_id) },
                { "email": user["email"] }
            ]})
        case "in_progress":
            database.collection_in_progress_tasks.find_one_and_delete({ "$and": [ 
                { "_id": ObjectId(req_id) },
                { "email": user["email"] }
            ]})
        case "in_review":
            database.collection_in_review_tasks.find_one_and_delete({ "$and": [ 
                { "_id": ObjectId(req_id) },
                { "email": user["email"] }
            ]})
        case "done":
            database.collection_done_tasks.find_one_and_delete({ "$and": [ 
                { "_id": ObjectId(req_id) },
                { "email": user["email"] }
            ]})
