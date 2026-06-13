import os
import shutil

from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
from fastapi.middleware.cors import CORSMiddleware

from document_loader import (
    load_pdf,
    load_docx,
    split_text
)

from rag import (
    store_chunks,
    ask_question
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://rag-chatbot-alpha-weld.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@app.post("/upload")

async def upload_file(
        file: UploadFile = File(...)
):

    filepath = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    if file.filename.endswith(".pdf"):
        text = load_pdf(filepath)

    elif file.filename.endswith(".docx"):
        text = load_docx(filepath)

    else:
        return {
            "message": "Unsupported file"
        }

    chunks = split_text(text)

    await store_chunks(chunks)

    return {
        "message": "Document indexed"
    }


@app.post("/chat")

async def chat(data: dict):

    question = data["question"]

    answer = await ask_question(question)

    return {
        "answer": answer
    }
@app.get("/")
async def check():
    return "Hello World"