from flask import Flask
from flask_cors import CORS
from flask import request
from flask import jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '/backend/images'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

softStorey = False



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/",methods=['POST','GET'])
def home():
    if request.method == 'POST':
      f = request.files['file']
      return 'file uploaded successfully'
    return "hello solution challenge"


@app.route("/soft-story",methods=['POST'])
def upload_file():
    if 'picture' not in request.files:
        return 'No image uploaded', 400

    image = request.files['picture']

    if image.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    
    #image.save('/path/to/save/image')
    if image and allowed_file(image.filename):
      #image = image.save(f'/backend/images/{image.filename}','JPEG')
      #filename = secure_filename(image.filename)
      #image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      
      return 'Image uploaded successfully', 200
    else:
      return jsonify({'error': 'Invalid file type'}), 400


if __name__ == "__main__":
   app.run(debug=True)