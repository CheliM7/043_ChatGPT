from flask import Flask
from blueprints.SentimentHandler.SentimentHandler import Sentiment_Handler
from blueprints.PollingHandler.PollingHandler import Polling_Handler
from blueprints.ChatbotHandler.ChatbotHandler import chatbot_handler
from blueprints.FactCheckHandler.FactCheckHandler import factCheck_handler
from blueprints.QuizBotHandler.quiz_bot_handler import quizbot_handler

from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {
    "origins": "*",  # Consider restricting this to specific origins in production
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type"]  # Specify the headers allowed in requests
}})


app.register_blueprint(Sentiment_Handler)
app.register_blueprint(Polling_Handler)
app.register_blueprint(chatbot_handler)
app.register_blueprint(factCheck_handler)
app.register_blueprint(quizbot_handler)

from app import views

