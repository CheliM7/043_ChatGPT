from flask import Blueprint,Flask,jsonify
from threading import Thread
import time
import random


Sentiment_Handler = Blueprint('Sentiment_Handler', __name__)


# Initial sentiment values
total_positive = 11
Anura_positive = 47.89
Sajith_positive = 32.44
Ranil_positive = 19.67

# Simulate sentiment updates (in real implementation, this should be from a live data source )
def update_sentiment():
    global total_positive, Anura_positive, Sajith_positive, Ranil_positive
    while True:
       
        Anura_positive += random.uniform(-1, 1)
        Sajith_positive += random.uniform(-1, 1)
        Ranil_positive += random.uniform(-1, 1)
        
        # Sleep for a set time interval before updating again 
        time.sleep(1)

# Start the sentiment update function in a separate thread
Thread(target=update_sentiment, daemon=True).start()



@Sentiment_Handler.route('/api/sentiment/total_positive')
def get_sentiment():
    return jsonify({
        'total_positive': total_positive,
        'Anura_positive': Anura_positive,
        'Sajith_positive': Sajith_positive,
        'Ranil_positive': Ranil_positive
    })