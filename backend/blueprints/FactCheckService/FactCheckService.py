from langchain_community.document_loaders import WebBaseLoader
from langchain.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import AIMessage, HumanMessage
from dotenv import load_dotenv
import os

class FactCheckService:
    def __init__(self):
        # Load environment variables from .env file
        load_dotenv()

        # Get the API key from environment variables
        self.api_key = os.getenv("GOOGLE_API_KEY")
        
        # Initialize embeddings and LLM
        self.embeddings = GoogleGenerativeAIEmbeddings(api_key=self.api_key, model="models/embedding-001")
        self.llm = ChatGoogleGenerativeAI(api_key=self.api_key, model="gemini-1.5-flash", temperature=0.3, max_tokens=1000)
        self.chat_history = []

        # Set your existing vector store path for presidential facts
        self.persist_directory = "local_chroma_db" 

        # Initialize vector store for presidential facts
        self.vectorstore = Chroma(persist_directory=self.persist_directory, embedding_function=self.embeddings, collection_name="general")

        # Initialize retriever
        self.retriever = self.vectorstore.as_retriever(search_kwargs={"k": 10})

        # Define fact-checking prompt
        self.system_prompt = (
            "You are an assistant that checks the validity of the following fact related to presidents. "
            "Use the context provided to determine if the fact is supported or not. "
            "Respond with 'True' if the fact is supported by the retrieved context, "
            "'False' if it is not supported, and 'Unknown' if there is not enough information."
        )

        self.prompt_template = ChatPromptTemplate.from_messages(
            [
                ("system", self.system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}"),
            ]
        )

    def qa_chain(self, fact):
        # Log the incoming fact
        print(f"Fact: {fact}")

        # Invoke retriever to get documents
        retrieved_docs = self.retriever.get_relevant_documents(fact)

        # Log retrieved documents
        print(f"Retrieved Documents: {retrieved_docs}")

        # Convert retrieved_docs to a string if it's a list
        if isinstance(retrieved_docs, list) and retrieved_docs:
            retrieved_docs = "\n\n".join([doc.page_content for doc in retrieved_docs if hasattr(doc, 'page_content')])
        else:
            print("No documents retrieved.")
            retrieved_docs = ""

        # Create the prompt with retrieved context and fact
        prompt = (
            "Check the validity of the following fact based on the context provided below.\n"
            "If the fact is supported by the context, respond with 'True'.\n"
            "If the fact is not supported, respond with 'False'.\n"
            "If there is not enough information, respond with 'Unknown'.\n\n"
            f"Context:\n{retrieved_docs}\n\n"
            f"Fact: {fact}\n"
        )

        # Pass the formatted prompt to the LLM
        result = self.llm.invoke(prompt)

        # Handle different result formats
        if isinstance(result, dict) and 'content' in result:
            return result['content']
        elif isinstance(result, str):
            return result
        elif isinstance(result, AIMessage):
            return result.content
        else:
            raise ValueError(f"Unexpected result format: {type(result)}")

    def fact_check(self, fact):
        result = self.qa_chain(fact)

        # Retain only the last 3 conversations in history
        if len(self.chat_history) >= 6:
            self.chat_history = self.chat_history[-3:]

        self.chat_history.extend([
            HumanMessage(content=fact),
            AIMessage(content=result),
        ])

        return result
