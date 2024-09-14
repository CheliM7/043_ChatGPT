from flask import Blueprint,Flask,jsonify
from threading import Thread
import time
import random
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from bson.json_util import dumps
from bson.objectid import ObjectId

from .util.winCalc import calculate_weighted_vote_percentage, calculate_final_win_percentage

Sentiment_Handler = Blueprint('Sentiment_Handler', __name__)


# Initialize sentiment values in a dictionary
sentiments = {
    'total_positive': 11,
    'Anura Kumara Dissanayake': 47.89,
    'Sajith Premadasa': 32.44,
    'Ranil Wickramasinghe': 19.67
}

# Simulate sentiment updates (in real implementation, this should be from a live data source)
def update_sentiment():
    while True:
        sentiments['Anura Kumara Dissanayake'] += random.uniform(-1, 1)
        sentiments['Sajith Premadasa'] += random.uniform(-1, 1)
        sentiments['Ranil Wickramasinghe'] += random.uniform(-1, 1)
        
        # Sleep for a set time interval before updating again
        time.sleep(10000)

# Start the sentiment update function in a separate thread
Thread(target=update_sentiment, daemon=True).start()


@Sentiment_Handler.route('/api/sentiment/total_positive')
def get_sentiment():
    return jsonify({
        'total_positive': sentiments['total_positive'],
        'Anura Kumara Dissanayake': sentiments['Anura Kumara Dissanayake'],
        'Sajith Premadasa': sentiments['Sajith Premadasa'],
        'Ranil Wickramasinghe': sentiments['Ranil Wickramasinghe']
    })

# There are multiple things to consider here when predicting the winner.

# 1. Sentiment score of each candidate
# 2. Total number of polls each candidate took from public polls 
# 3. The number of votes each candidate get form inbuilt voting system

# MongoDB URI and client setup
MONGO_URI = 'mongodb+srv://Savinu:Savinu@cluster0.poxt2.mongodb.net/voting_database?retryWrites=true&w=majority'
client = MongoClient(MONGO_URI)
db = client['voting_database']
collection = db['candidates']

public_polls = {
    'Sajith Premadasa': 9501,
    'Anura Kumara Dissanayake': 12290,
    'Ranil Wickramasinghe': 6244
}

def get_candidates():
    try:
        candidates = collection.find()
        # Convert the cursor to a list and remove the '_id' field from each document
        candidates_list = []
        for candidate in candidates:
            candidate_copy = candidate.copy()  # Create a copy of the document
            candidate_copy.pop('_id', None)  # Remove the '_id' field
            candidates_list.append(candidate_copy)
        return jsonify(candidates_list)
    except ConnectionError:
        return jsonify({'error': 'Failed to connect to MongoDB'}), 500



@Sentiment_Handler.route('/api/WinPrediction')
def get_prediction():
    try:
        # Get candidates from the database using the get_candidates function
        candidates = get_candidates().json  # Assuming `get_candidates` returns a JSON response

        # Calculate the weighted vote percentages
        weighted_results = calculate_weighted_vote_percentage(public_polls, candidates)

        # get the sentiment percentage of each candidate

        final_results = calculate_final_win_percentage(weighted_results, sentiments)

        # Return the final win results as a JSON response
        return jsonify(final_results)
    except ConnectionError:
        return jsonify({'error': 'Failed to connect to MongoDB'}), 500