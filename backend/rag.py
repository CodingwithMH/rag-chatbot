import os
import uuid
import asyncio
from dotenv import load_dotenv
load_dotenv()
from openai import AsyncOpenAI

# 1. FIXED: Make sure you import both the client (pc) and the index from your DB file
from pinecone_db import pc, index 

external_client: AsyncOpenAI = AsyncOpenAI(
    api_key=os.getenv("GEMINI_API_KEY1"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

# 2. FIXED: Use pc.inference.embed, wrapped inside an async thread-pool executor
async def create_embedding(text):
    loop = asyncio.get_running_loop()
    response = await loop.run_in_executor(
        None, 
        lambda: pc.inference.embed(
            model="llama-text-embed-v2",
            inputs=[text],
            parameters={"input_type": "passage"}
        )
    )
    return response[0]["values"]


# 3. FIXED: Adjusted to safely process your documents asynchronously
async def store_chunks(chunks):
    vectors = []
    for chunk in chunks:
        embedding = await create_embedding(chunk)
        vectors.append({
            "id": str(uuid.uuid4()),
            "values": embedding,
            "metadata": {"text": chunk}
        })
    
    # Push vectors to Pinecone index using thread executor
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, lambda: index.upsert(vectors=vectors))


async def retrieve(query):
    query_embedding = await create_embedding(query)

    loop = asyncio.get_running_loop()
    results = await loop.run_in_executor(
        None,
        lambda: index.query(
            vector=query_embedding,
            top_k=5,
            include_metadata=True
        )
    )

    context = "\n\n".join(
        match["metadata"]["text"]
        for match in results["matches"]
    )
    return context


async def ask_question(question):
    context = await retrieve(question)

    messages = [
        {
            "role": "system",
            "content": """
            You are a RAG assistant.
            Answer ONLY using the provided context.
            If answer is not found in context, say:
            'I could not find that information in the uploaded documents.'
            """
        },
        {
            "role": "user",
            "content": f"Context:\n\n{context}\n\nQuestion:\n\n{question}"
        }
    ]

    response = await external_client.chat.completions.create(
        model="gemini-2.5-flash-lite",
        messages=messages,
        temperature=0.3
    )

    return response.choices[0].message.content