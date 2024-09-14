from flask import Blueprint,Flask,jsonify
from threading import Thread
import time
import random
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from bson.json_util import dumps
from bson.objectid import ObjectId


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


def calculate_weighted_vote_percentage(public_polls, candidates, public_poll_weight=0.7, db_poll_weight=0.3):
    """
    Calculate the weighted vote percentage based on public polls and database votes.

    :param public_polls: Dictionary containing public poll results.
    :param candidates: List of candidates retrieved from the database.
    :param public_poll_weight: Weight assigned to public poll votes.
    :param db_poll_weight: Weight assigned to database votes.
    :return: A dictionary with candidates' names and their weighted vote percentage.
    """
    # Copy of public_polls to avoid modifying the original dictionary
    updated_polls = public_polls.copy()

    # Total votes from public_polls and database votes
    total_public_votes = sum(public_polls.values())
    total_db_votes = 0

    # Iterate over the candidates and update the vote count
    for candidate in candidates:
        name = candidate.get('name')
        votes = candidate.get('vote_count', 0)  # Default to 0 if votes not found
        total_db_votes += votes

        if name in updated_polls:
            updated_polls[name] += votes  # Add database votes to public poll values
        else:
            updated_polls[name] = votes  # Add new candidates if not already in public_polls

    # Calculate total weighted votes
    total_weighted_votes = (public_poll_weight * total_public_votes) + (db_poll_weight * total_db_votes)

    # Calculate the weighted percentages
    weighted_results = {}
    for name, votes in updated_polls.items():
        public_votes = public_polls.get(name, 0)
        db_votes = votes - public_votes

        # Calculate weighted votes
        weighted_votes = (public_poll_weight * public_votes) + (db_poll_weight * db_votes)

        # Calculate percentage
        weighted_percentage = (weighted_votes / total_weighted_votes) * 100
        weighted_results[name] = round(weighted_percentage, 2)

    return weighted_results


def calculate_final_win_percentage(weighted_results, sentiments):
    """
    Calculate the final win percentage by averaging the weighted results and sentiment values.

    :param weighted_results: Dictionary of weighted vote percentages from the database and public polls.
    :param sentiments: Dictionary of positive sentiment values for each candidate.
    :return: A dictionary with the final win percentages for each candidate.
    """
    final_results = {}

    for name in weighted_results:
        if name == 'total_positive':
            continue  # Skip the total positive sentiment value
        weighted_vote = weighted_results[name]
        sentiment = sentiments.get(name, 0)  # Get the sentiment value, default to 0 if not present

        # Calculate the average of the weighted vote percentage and the sentiment percentage
        final_win_percentage = (weighted_vote + sentiment) / 2

        final_results[name] = round(final_win_percentage, 2)

    return final_results


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