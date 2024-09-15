
from flask import Flask, request, jsonify,Blueprint
from langchain_community.document_loaders import WebBaseLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough, chain
from langchain.chains import create_history_aware_retriever
from langchain_core.messages import AIMessage, HumanMessage
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import os
from blueprints.ChatbotService.chatbot_service import ChatbotService
import asyncio

chatbot_handler = Blueprint('chatbot_handler', __name__)

chatbot_service = ChatbotService()

@chatbot_handler.route('/api/get_answer', methods=['POST'])
async def ask():
    # Get the question from the request
    data = request.json
    question = data.get('question')
    
    if not question:
        return jsonify({"error": "No question provided"}), 400
    
    # Get the chatbot response
    response = chatbot_service.chatbot(question)
    
    # Return the response as JSON
    return jsonify({"answer": response})

