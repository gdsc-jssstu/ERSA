from flask import Flask
from flask_cors import CORS
from flask import request

app = Flask(__name__)

CORS(app)
@app.route("/",methods=['POST','GET'])
def home():
    if request.method == 'POST':
      f = request.files['file']
      return 'file uploaded successfully'
    return "hello solution challenge"


@app.route("/soft-story",methods=['POST','GET'])
def softStory():
    return "hi"

if __name__ == "__main__":
   app.run(debug=True)