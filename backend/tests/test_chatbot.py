import json
import pytest
from flask import Flask
from blueprints.ChatbotHandler.ChatbotHandler import chatbot_handler 

# Mock the ChatbotService for testing
class MockChatbotService:
    def chatbot(self, question):
        return "This is a mocked response to the question: " + question

@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(chatbot_handler)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture(autouse=True)
def override_chatbot_service(monkeypatch):
    from blueprints.ChatbotService.chatbot_service import ChatbotService
    monkeypatch.setattr(ChatbotService, 'chatbot', MockChatbotService().chatbot)

def test_ask_with_valid_question(client):
    test_data = {'question': 'What is the stock price of AAPL?'}
    response = client.post('/api/get_answer', json=test_data)

    assert response.status_code == 200
    json_data = json.loads(response.data)
    assert 'answer' in json_data
    assert json_data['answer'] == "This is a mocked response to the question: What is the stock price of AAPL?"

def test_ask_with_missing_question(client):
    test_data = {}
    response = client.post('/api/get_answer', json=test_data)

    assert response.status_code == 400
    json_data = json.loads(response.data)
    assert 'error' in json_data
    assert json_data['error'] == "No question provided"
