from flask import Blueprint, request, jsonify
from chromadb import Client
from langchain.prompts import PromptTemplate
from langchain.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os
import json
import re
import ast
from langchain.chains import RetrievalQA

# Load environment variables
load_dotenv()

# Define the API key for the Google Generative AI
api_key = os.getenv("GOOGLE_API_KEY")

# Set up the ChromaDB persistence directory and initialize the vector store
persist_directory = "local_chroma_db"
client = Client()
embeddings = GoogleGenerativeAIEmbeddings(api_key=api_key, model="models/embedding-001")
llm = ChatGoogleGenerativeAI(api_key=api_key, model="gemini-1.5-flash", temperature=0.3, max_tokens=1000)

# Initialize the vector store
vector_store = Chroma(persist_directory=persist_directory, embedding_function=embeddings, collection_name="general")
retriever = vector_store.as_retriever(search_kwargs={"k": 10})

quizbot_handler = Blueprint('quizbot_handler', __name__)

@quizbot_handler.route('/api/quiz/start', methods=['POST'])
def start_quiz():
    data = request.json

    global topic
    topic = data['topic']

    global knowledge_base
    knowledge_base = retriever.invoke(topic)
    
    # print("----knowledge_base----")
    # print(knowledge_base)


    global chat_history
    chat_history = []
    chat_history.append({"message": "Quiz started on the topic: " + topic})

    # print("----chat_history----")
    # print(chat_history) 

    return jsonify({"message": "Quiz started on the topic: " + topic})   

# Fetch available topics from Chroma
@quizbot_handler.route('/api/quiz/get_question', methods=['POST'])
def get_question():
    prompt_template = PromptTemplate(
        input_variables=["topic"],
        template="You are a quiz bot that generates quiz related to the topics user gives to educate the user for election"
                 "Generate 1 mcq question with 4 options on the topic {topic}. "
                 "Use the following knowledge base to generate the question: {knowledge_base}. "
                 "Use the following chat history to be aware of the context: {chat_history}. "
                 "Do not generate previously asked questions. "

                 "Provide the response in the following dictionary format: "
                 "{{'question': <question>, 'answers': [<option1>, <option2>, <option3>, <option4>], 'correct_answer': <number>, 'explanation': <explanation>}}",
    )

    prompt = prompt_template.format(topic=topic, chat_history=chat_history, knowledge_base=knowledge_base)

    response = llm.invoke(prompt)
    response = response.content

    response = response.replace('```json','')
    response = response.replace('```','')

    # print("----response----")
    # print(response)

    data_dict = ast.literal_eval(response)

    # Extracting values
    question = data_dict.get('question')
    answers = data_dict.get('answers')
    correct_answer = data_dict.get('correct_answer')
    explanation = data_dict.get('explanation')

    chat_history.append({"question": question, "answers": answers, "correct_answer": correct_answer, "explanation": explanation})

    # print("----chat_history----")
    # print(chat_history) 

    return jsonify({"question": question, "answers": answers, "correct_answer": correct_answer, "explanation": explanation})