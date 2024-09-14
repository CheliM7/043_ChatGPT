from flask import Blueprint
from flask import request, jsonify
from pymongo import MongoClient
from pymongo.errors import PyMongoError

Polling_Handler = Blueprint('Polling_Handler', __name__)

# MongoDB URI and client setup
MONGO_URI = 'mongodb+srv://Savinu:Savinu@cluster0.poxt2.mongodb.net/voting_database?retryWrites=true&w=majority'
client = MongoClient(MONGO_URI)
db = client['voting_database']
collection = db['candidates']


@Polling_Handler.route('/api/vote', methods=['POST'])
def vote():
    try:
        data = request.json
        candidate_name = data.get('name')
        
        if not candidate_name:
            return jsonify({'error': 'No candidate name provided'}), 400
        
        result = collection.update_one(
            {'name': candidate_name},
            {'$inc': {'vote_count': 1}},
            upsert=True
        )
        
        if result.modified_count > 0 or result.upserted_id is not None:
            return jsonify({'message': 'Vote counted successfully'}), 200
        else:
            return jsonify({'error': 'Failed to count vote'}), 500

    except ConnectionError:
        return jsonify({'error': 'Failed to connect to MongoDB'}), 500

@Polling_Handler.route('/api/polling/candidates', methods=['GET'])
def get_candidates():
    try:
        candidates = collection.find()
        return jsonify(list(candidates))
    except ConnectionError:
        return jsonify({'error': 'Failed to connect to MongoDB'}), 500