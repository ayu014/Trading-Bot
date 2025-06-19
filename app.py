import os
import requests
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify

load_dotenv()

app = Flask(__name__)
CORS(app)

BLAND_API_KEY = os.getenv('BLAND_API_KEY')
print(BLAND_API_KEY)
BLAND_BASE_URL = "https://api.bland.ai/v1"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_call', methods=['POST'])
def start_call():
    # This will initiate the Bland.ai conversation
    pass

@app.route('/get_symbols', methods=['GET'])
def get_binance_symbols():
    # Fetch trading pairs from Binance API
    pass

@app.route('/get_price', methods=['GET'])
def get_symbol_price():
    # Get current price for a specific symbol
    pass

if __name__ == '__main__':
    app.run(debug=True)
