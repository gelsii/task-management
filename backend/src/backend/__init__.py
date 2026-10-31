import uvicorn 
from dotenv import load_dotenv
import os

load_dotenv() 

def main() -> None:
    uvicorn.run(app="app:app", host="0.0.0.0", port=int(os.getenv("PORT")), reload=True)
    print("Hello from backend!")
    
