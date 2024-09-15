from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyPDFLoader
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.runnables import chain
from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.messages import AIMessage, HumanMessage
from IPython.display import Markdown, display
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify,Blueprint

chatbot_handler = Blueprint('chatbot_handler', __name__)


# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv("GOOGLE_API_KEY")

embeddings = GoogleGenerativeAIEmbeddings(api_key=api_key, model="models/embedding-001")
llm = ChatGoogleGenerativeAI(api_key=api_key, model="gemini-1.5-flash", temperature=0.3, max_tokens=1000)
chat_history = []


# general information
vectorstore_general = Chroma(persist_directory="local_chroma_db", embedding_function=embeddings, collection_name="general")
retriever_general = vectorstore_general.as_retriever(search_kwargs={"k": 10})


 # sajith's manifesto
vectorstore_sajith = Chroma(persist_directory="local_chroma_db", embedding_function=embeddings, collection_name="sajith_premadasa")
retriever_sajith = vectorstore_sajith.as_retriever(search_kwargs={"k": 10})

# akd's manifesto
vectorstore_akd = Chroma(persist_directory="local_chroma_db", embedding_function=embeddings, collection_name="anura_kumara_dissanayake")
retriever_akd = vectorstore_akd.as_retriever(search_kwargs={"k": 10})

# ranil's manifesto
vectorstore_ranil = Chroma(persist_directory="local_chroma_db", embedding_function=embeddings, collection_name="ranil_wickramasinghe")
retriever_ranil = vectorstore_ranil.as_retriever(search_kwargs={"k": 10})

contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which might reference context in the chat history, "
    "formulate a standalone question which can be understood "
    "without the chat history. Do NOT answer the question, "
    "just reformulate it if needed and otherwise return it as is."
)

print(vectorstore_ranil)

contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)

history_aware_retriever_general = create_history_aware_retriever(
    llm, retriever_general, contextualize_q_prompt
)

history_aware_retriever_sajith = create_history_aware_retriever(
    llm, retriever_sajith, contextualize_q_prompt
)

history_aware_retriever_akd = create_history_aware_retriever(
    llm, retriever_akd, contextualize_q_prompt
)

history_aware_retriever_ranil = create_history_aware_retriever(
    llm, retriever_ranil, contextualize_q_prompt
)

retrievers = {
    "sajith_premadasa": history_aware_retriever_sajith,
    "anura_kumara_dissanayake": history_aware_retriever_akd,
    "ranil_wickramasinghe": history_aware_retriever_ranil,
}

class SearchAndCompare(BaseModel):
    """Search for information about a person or compare informations about persons."""
    queryType: str = Field(
        ...,
        description="Query type. Should be `search` or `compare` or `general`. if there's only one person name it's search, if there are many person's name it's compare, or it can be a general question which does not require any specific person",)

    query: str = Field(
        ...,
        description="Query to look up or query to compare",
    )

    candidates: int = Field(
        ...,
        description="Number of persons to search or compare. can be 0 for general questions",
    )

    person1: str = Field(
        ...,
        description="Person to look things up for or persons to compare. Should be `sajith_premadasa` or `anura_kumara_dissanayake` or `ranil_wickramasinghe` or can be 'null'.",
    )
    person2: str = Field(
        ...,
        description="Person to look things up for or persons to compare. Should be `sajith_premadasa` or `anura_kumara_dissanayake` or `ranil_wickramasinghe` or can be 'null'.",
    )
    person3: str = Field(
        ...,
        description="Person to look things up for or persons to compare. Should be `sajith_premadasa` or `anura_kumara_dissanayake` or `ranil_wickramasinghe` or can be 'null'.",
    )

system_query = """You have the ability to determine whether the user question is general, or it is related to a specific person or it is a comparison between multiple persons. if you can't find the type set it as general"""
prompt_query = ChatPromptTemplate.from_messages(
    [
        ("system", system_query),
        ("human", "{question}"),
    ]
)

structured_llm_query = llm.with_structured_output(SearchAndCompare)
query_analyzer = {"question": RunnablePassthrough()} | prompt_query | structured_llm_query

@chain
def qa_chain(question):
    response = query_analyzer.invoke(question)
    # print(response)
    if response.queryType == "search" or response.queryType == "compare":
        if response.queryType == "search":
            retriever = retrievers[response.person1]
            retrieved_docs = retriever.invoke({"input":response.query, "chat_history": chat_history})

            prompt = (
            "system :"
            "You are an assistant for question-answering tasks. "
            "Use the following pieces of retrieved context to answer "
            "the question. If you don't know the answer, say that you "
            "don't know."
            "\n\n"
            "{context}"
            "\n\n"

            "chat_history :" 
            "{chat_history}"

            "human :"
            "{question}"
            ).format(context=retrieved_docs, question=question, chat_history=chat_history)

            result = llm.invoke(prompt)

            return result
    
        elif response.queryType == "compare":
            retriever1 = retrievers[response.person1]
            retrieved_docs1 = retriever1.invoke({"input":response.query, "chat_history": chat_history})

            if response.person2 != 'null':
                retriever2 = retrievers[response.person2]
                retrieved_docs2 = retriever2.invoke({"input":response.query, "chat_history": chat_history})
            else:
                retrieved_docs2 = ''

            if response.person3 != 'null':
                retriever3 = retrievers[response.person3]
                retrieved_docs3 = retriever3.invoke({"input":response.query, "chat_history": chat_history})
            else:
                retrieved_docs3 = ''

            prompt = (
            "system :"
            "You are an assistant for comparing manifestos. "
            "Use the following pieces of retrieved context from different manifestos to answer "
            "the question. If you don't know the answer, say that you "
            "don't know."
            "\n\n"
            "{context1}"
            "\n\n"
            "{context2}"
            "\n\n"
            "{context3}"
            "\n\n"

            "chat_history :" 
            "{chat_history}"

            "human :"
            "{question}"
            ).format(context1=retrieved_docs1, context2=retrieved_docs2, context3=retrieved_docs3, question=question, chat_history=chat_history)

            result = llm.invoke(prompt)

            return result
    else:
        retriever = history_aware_retriever_general
        retrieved_docs = retriever.invoke({"input":response.query, "chat_history": chat_history})

        prompt = (
            "system :"
            "You are an assistant for question-answering tasks related to srilankan election."
            "Use the following pieces of retrieved context to answer "
            "the question. If you don't know the answer, say that you "
            "don't know."
            "or if the question is not much related to srilankan election say that this question is not related to srilankan election ass a election chatbot i can't provide you with answer this."
            "\n\n"
            "{context}"
            "\n\n"

            "chat_history :" 
            "{chat_history}"

            "human :"
            "{question}"
            ).format(context=retrieved_docs, question=question, chat_history=chat_history)

        result = llm.invoke(prompt)
        return result

def chatbot(question):
    result = qa_chain.invoke(question)
    
    # retains only last 3 conversations in history
    if len(chat_history) == 6:
        chat_history.pop(0)
        chat_history.pop(0)
    
    chat_history.extend([
            HumanMessage(content=question),
            AIMessage(content=result.content),
        ])
    
    return result.content


question = "Describe Anura kumara's manifesto"
answer = chatbot(question)
print(answer)

# Defining flask endpoint

@chatbot_handler.route('/api/get_answer', methods=['POST'])
def get_answer():
    try:
        data = request.get_json()
        question = data.get('question', '')

        if not question:
            return jsonify({"error": "No question provided"}), 400
        
        # Pass the question to the chatbot function to get the answer
        answer = chatbot(question)
        
        return jsonify({"answer": answer}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500