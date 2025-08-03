from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/projects")
def get_projects():
    return [
        {"title": "AI Chatbot", "description": "A multilingual chatbot using Whisper + GPT."},
        {"title": "PDF Validator", "description": "Bookmark and rule-based PDF checker tool."}
    ]

@app.get("/api/tools")
def get_tools():
    return [
        "Angular", "FastAPI", "Langchain", "OpenAI API", "Whisper", "Tailwind", "Docker"
    ]