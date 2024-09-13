from flask import Blueprint

Sentiment_Handler = Blueprint('Sentiment_Handler', __name__)

@Sentiment_Handler.route('/sentiment')
def sentiment():
    return 'Sentiment Analysis'