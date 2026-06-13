from pinecone import Pinecone
from dotenv import load_dotenv
load_dotenv()
import os

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index = pc.Index("rag-implementation")