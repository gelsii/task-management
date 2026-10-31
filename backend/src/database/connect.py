from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv() 

class DatabaseClient:
    def __init__(self):
        client =  MongoClient(os.getenv(key="DATABASE_URI"))

        self.database = client.get_database(name="task_management")

        self.collection_users = self.database.get_collection(name="users")

        self.collection_todo_tasks = self.database.get_collection(name="todo_tasks")

        self.collection_in_progress_tasks = self.database.get_collection(name="in_progress_tasks")

        self.collection_in_review_tasks = self.database.get_collection(name="in_review_tasks")

        self.collection_done_tasks = self.database.get_collection(name="done_tasks")

        self.collection_expired_tokens_user = self.database.get_collection(name="expired_tokens_user")