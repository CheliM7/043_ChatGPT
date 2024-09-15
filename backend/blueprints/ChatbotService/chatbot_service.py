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

class ChatbotService:
    def __init__(self):
        # Load environment variables from .env file
        load_dotenv()

        # Get the API key from environment variables
        self.api_key = os.getenv("GOOGLE_API_KEY")

        # Initialize embeddings and LLM
        self.embeddings = GoogleGenerativeAIEmbeddings(api_key=self.api_key, model="models/embedding-001")
        self.llm = ChatGoogleGenerativeAI(api_key=self.api_key, model="gemini-1.5-flash", temperature=0.3, max_tokens=1000)
        self.chat_history = []

        # Initialize vectorstores and retrievers
        self.vectorstores = {
            "general": Chroma(persist_directory="local_chroma_db", embedding_function=self.embeddings, collection_name="general"),
            "sajith_premadasa": Chroma(persist_directory="local_chroma_db", embedding_function=self.embeddings, collection_name="sajith_premadasa"),
            "anura_kumara_dissanayake": Chroma(persist_directory="local_chroma_db", embedding_function=self.embeddings, collection_name="anura_kumara_dissanayake"),
            "ranil_wickramasinghe": Chroma(persist_directory="local_chroma_db", embedding_function=self.embeddings, collection_name="ranil_wickramasinghe"),
        }
        
        self.retrievers = {
            "sajith_premadasa": self.vectorstores["sajith_premadasa"].as_retriever(search_kwargs={"k": 10}),
            "anura_kumara_dissanayake": self.vectorstores["anura_kumara_dissanayake"].as_retriever(search_kwargs={"k": 10}),
            "ranil_wickramasinghe": self.vectorstores["ranil_wickramasinghe"].as_retriever(search_kwargs={"k": 10}),
            "general": self.vectorstores["general"].as_retriever(search_kwargs={"k": 10}),
        }

        # Define system prompts
        self.contextualize_q_system_prompt = (
            "Given a chat history and the latest user question "
            "which might reference context in the chat history, "
            "formulate a standalone question which can be understood "
            "without the chat history. Do NOT answer the question, "
            "just reformulate it if needed and otherwise return it as is."
        )

        self.contextualize_q_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.contextualize_q_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}"),
            ]
        )

        # Initialize history aware retrievers
        self.history_aware_retrievers = {
            key: create_history_aware_retriever(self.llm, retriever, self.contextualize_q_prompt)
            for key, retriever in self.retrievers.items()
        }

        # Define query system prompt
        self.system_query = """You have the ability to determine whether the user question is general, or it is related to a specific person or it is a comparison between multiple persons. if you can't find the type set it as general"""
        self.prompt_query = ChatPromptTemplate.from_messages(
            [
                ("system", self.system_query),
                ("human", "{question}"),
            ]
        )

        self.structured_llm_query = self.llm.with_structured_output(SearchAndCompare)
        self.query_analyzer = {"question": RunnablePassthrough()} | self.prompt_query | self.structured_llm_query

    def qa_chain(self, question):
        # Log the incoming question
        print(f"Question: {question}")
        
        # Analyze the query
        response = self.query_analyzer.invoke(question)
        print(f"Query Analyzer Response: {response}")
        
        # Handle search or comparison
        if response.queryType in ["search", "compare"]:
            if response.queryType == "search":
                retriever = self.history_aware_retrievers.get(response.person1, self.history_aware_retrievers["general"])
                print("Retriever ISSSS !!!: ", retriever)
                
                retrieved_docs = retriever.invoke({"input": response.query, "chat_history": self.chat_history})
                
                time.sleep(2)
                # Log retrieved documents
                print(f"Retrieved Docs: {retrieved_docs}")

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
                ).format(context=retrieved_docs, question=question, chat_history=self.chat_history)

                # Log the prompt
                print(f"Prompt: {prompt}")
                
                result = self.llm.invoke(prompt)
                return result

            elif response.queryType == "compare":
                retrieved_docs = []
                for person in [response.person1, response.person2, response.person3]:
                    if person != 'null':
                        retriever = self.history_aware_retrievers.get(person, self.history_aware_retrievers["general"])
                        docs = retriever.invoke({"input": response.query, "chat_history": self.chat_history})
                        retrieved_docs.append(docs)
                    else:
                        retrieved_docs.append('')
               
                print(f"Retrieved Docs: {retrieved_docs}")
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
                ).format(context1=retrieved_docs[0], context2=retrieved_docs[1], context3=retrieved_docs[2], question=question, chat_history=self.chat_history)

                # Log the prompt
                print(f"Prompt: {prompt}")
                
                result = self.llm.invoke(prompt)
                return result
        else:
            retriever = self.history_aware_retrievers["general"]
            retrieved_docs = retriever.invoke({"input": response.query, "chat_history": self.chat_history})

            # Log retrieved documents
            print(f"Retrieved Docs: {retrieved_docs}")

            prompt = (
                "system :"
                "You are an assistant for question-answering tasks related to srilankan election."
                "Use the following pieces of retrieved context to answer "
                "the question. If you don't know the answer, say that you "
                "don't know."
                "or if the question is not much related to srilankan election say that this question is not related to srilankan election as a election chatbot i can't provide you with answer this."
                "\n\n"
                "{context}"
                "\n\n"
                "chat_history :" 
                "{chat_history}"
                "human :"
                "{question}"
            ).format(context=retrieved_docs, question=question, chat_history=self.chat_history)

            # Log the prompt
            print(f"Prompt: {prompt}")
            
            result = self.llm.invoke(prompt)
            return result

    def chatbot(self, question):
        result = self.qa_chain(question)
        print(f"Chatbot Result: {result}")
        # Retain only last 3 conversations in history
        if len(self.chat_history) >= 6:
            self.chat_history = self.chat_history[-3:]
        
        self.chat_history.extend([
            HumanMessage(content=question),
            AIMessage(content=result.content),
        ])
        
        return result.content

class SearchAndCompare(BaseModel):
    """Search for information about a person or compare informations about persons."""
    queryType: str = Field(
        ...,
        description="Query type. Should be `search` or `compare` or `general`. if there's only one person name it's search, if there are many person's name it's compare, or it can be a general question which does not require any specific person",
    )

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


chatbot_service = ChatbotService()

# questions = ["Compare ranil with anura"]

# print(chatbot_service.chatbot(questions[0]))
