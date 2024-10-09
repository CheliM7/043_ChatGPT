import json
import pytest
from flask import Flask
from blueprints.PollingHandler.PollingHandler import Polling_Handler

# Mock MongoDB setup
class MockMongoCollection:
    def __init__(self):
        self.data = {
            "John Doe": {"name": "John Doe", "vote_count": 10},
            "Jane Doe": {"name": "Jane Doe", "vote_count": 5},
        }
    
    def update_one(self, filter, update, upsert=False):
        name = filter.get('name')
        if name in self.data:
            self.data[name]['vote_count'] += 1
            return MockUpdateResult(modified_count=1, upserted_id=None)
        elif upsert:
            self.data[name] = {'name': name, 'vote_count': 1}
            return MockUpdateResult(modified_count=0, upserted_id="mocked_id")
        else:
            return MockUpdateResult(modified_count=0, upserted_id=None)
    
    def find(self):
        return [candidate for candidate in self.data.values()]

class MockUpdateResult:
    def __init__(self, modified_count, upserted_id):
        self.modified_count = modified_count
        self.upserted_id = upserted_id


@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(Polling_Handler)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture(autouse=True)
def mock_mongo(monkeypatch):
    mock_collection = MockMongoCollection()
    monkeypatch.setattr('blueprints.PollingHandler.PollingHandler.collection', mock_collection)

# Test for /api/vote
def test_vote_success_existing_candidate(client):
    test_data = {'name': 'John Doe'}
    response = client.post('/api/vote', json=test_data)

    assert response.status_code == 200
    json_data = json.loads(response.data)
    assert json_data['message'] == 'Vote counted successfully'

def test_vote_success_new_candidate(client):
    test_data = {'name': 'New Candidate'}
    response = client.post('/api/vote', json=test_data)

    assert response.status_code == 200
    json_data = json.loads(response.data)
    assert json_data['message'] == 'Vote counted successfully'

def test_vote_no_name_provided(client):
    test_data = {}
    response = client.post('/api/vote', json=test_data)

    assert response.status_code == 400
    json_data = json.loads(response.data)
    assert json_data['error'] == 'No candidate name provided'

# Test for /api/polling/candidates
def test_get_candidates(client):
    response = client.get('/api/polling/candidates')

    assert response.status_code == 200
    json_data = json.loads(response.data)
    assert len(json_data) == 2
    assert json_data[0]['name'] == 'John Doe'
    assert json_data[0]['vote_count'] == 10
    assert json_data[1]['name'] == 'Jane Doe'
    assert json_data[1]['vote_count'] == 5

# Test for connection error
def test_vote_mongo_connection_error(client, monkeypatch):
    def mock_update_one(*args, **kwargs):
        raise ConnectionError("Simulated connection error")

    monkeypatch.setattr('blueprints.PollingHandler.PollingHandler.collection.update_one', mock_update_one)
    
    test_data = {'name': 'John Doe'}
    response = client.post('/api/vote', json=test_data)

    assert response.status_code == 500
    json_data = json.loads(response.data)
    assert json_data['error'] == 'Failed to connect to MongoDB'
