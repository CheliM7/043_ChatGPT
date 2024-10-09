import json
import pytest
from flask import Flask
from blueprints.FactCheckHandler.FactCheckHandler import factCheck_handler

# Mock the FactCheckService for testing
class MockFactCheckService:
    def fact_check(self, question):
        return "This is a mocked fact-check response for: " + question

@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(factCheck_handler)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture(autouse=True)
def override_factcheck_service(monkeypatch):
    # Override the factCheck_service with the mock
    from blueprints.FactCheckService.FactCheckService import FactCheckService
    monkeypatch.setattr(FactCheckService, 'fact_check', MockFactCheckService().fact_check)

def test_fact_check_with_valid_question(client):
    test_data = {'question': 'Is the sky blue?'}
    response = client.post('/api/factCheck', json=test_data)

    assert response.status_code == 200
    json_data = json.loads(response.data)
    assert 'answer' in json_data
    assert json_data['answer'] == "This is a mocked fact-check response for: Is the sky blue?"

def test_fact_check_with_missing_question(client):
    test_data = {}
    response = client.post('/api/factCheck', json=test_data)

    assert response.status_code == 400
    json_data = json.loads(response.data)
    assert 'error' in json_data
    assert json_data['error'] == "No question provided"

def test_fact_check_with_error(client, monkeypatch):
    # Simulate an error during fact checking
    class MockErrorFactCheckService:
        def fact_check(self, question):
            raise Exception("Simulated error")

    # Override the service to simulate an error
    from blueprints.FactCheckService.FactCheckService import FactCheckService
    monkeypatch.setattr(FactCheckService, 'fact_check', MockErrorFactCheckService().fact_check)

    test_data = {'question': 'Is the sky blue?'}
    response = client.post('/api/factCheck', json=test_data)

    assert response.status_code == 500
    json_data = json.loads(response.data)
    assert 'error' in json_data
    assert json_data['error'] == "Error processing request"
