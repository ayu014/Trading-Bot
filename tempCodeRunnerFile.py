import os
import requests
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify

load_dotenv()

app = Flask(__name__)
CORS(app)

BLAND_API_KEY = os.environ.get('BLAND_API_KEY')
print(BLAND_API_KEY)