
from flask import Flask, request, jsonify,Blueprint
from dotenv import load_dotenv
import os
from blueprints.FactCheckService.FactCheckService import FactCheckService


factCheck_handler = Blueprint('factcheck_handler', __name__)

@factCheck_handler.before_app_request
def initialize_chatbot_service():
    global factCheck_service
    factCheck_service = FactCheckService()
    print("FactCheckService initialized")

@factCheck_handler.route('/api/factCheck', methods=['POST'])
def ask():
    # Get the question from the request
    data = request.json
    print(f"Received request data: {data}")  # Log incoming data
    question = data.get('question')

    if not question:
        return jsonify({"error": "No question provided"}), 400

    try:
        # Get the chatbot response
        response = factCheck_service.fact_check(question)
        # Return the response as JSON
        return jsonify({"answer": response})
    except Exception as e:
        print(f"Error during fact checking: {e}")
        return jsonify({"error": "Error processing request"}), 500