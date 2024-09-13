from flask import Blueprint

Polling_Handler = Blueprint('Polling_Handler', __name__)

@Polling_Handler.route('/polling')
def polling():
    return 'Polling Handler'