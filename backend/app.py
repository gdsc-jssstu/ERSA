from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
@app.route("/",methods=['POST','GET'])
def home():
    return "hello"


@app.route("/soft-story",methods=['POST','GET'])
def softStory():
    return "hi"