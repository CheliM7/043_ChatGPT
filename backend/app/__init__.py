from flask import Flask
from blueprints.SentimentHandler.SentimentHandler import Sentiment_Handler
from blueprints.PollingHandler.PollingHandler import Polling_Handler

app = Flask(__name__)
app.register_blueprint(Sentiment_Handler)
app.register_blueprint(Polling_Handler)

from app import views

