from flask import Flask
from flask_cors import CORS,cross_origin
from flask import request
from flask import jsonify
from werkzeug.utils import secure_filename
#from scipy.misc import imresize, imread
#from skimage.transform import resize
import base64
import numpy as np
# import tensorflow as tf
#import keras.models
import cv2
import re
import sys
import os
import glob
from load import *

app = Flask(__name__)
CORS(app)

global model

model = init()

UPLOAD_FOLDER = 'images'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

softStorey = False

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def convertImage(imgData1):
	imgstr = re.search(b'base64,(.*)',imgData1).group(1)
	with open('output.png','wb') as output:
	    output.write(base64.b64decode(imgstr))

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
      filename = secure_filename(image.filename)
      image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      #image = image.read()
      #resize(image, (100, 100))
      #image = image.reshape(256, 256, 3)
      #convertImage(image)
      #x = imread('output.png',mode='L')
      #x = np.invert(x)
      # x = imresize(x,(28,28))
      #x = x.reshape(1,28,28,1)
      #for img in glob.glob('images'+image.filename):
      #imageName = glob.glob('images'+image.filename)
      new_image = cv2.imread('images/'+image.filename)
      imResized = cv2.resize(new_image,(256,256))
      #img = cv2.imread(, cv2.IMREAD_COLOR)
      # print(imResized)
      imResized = imResized/255.0
      print(imResized.shape)
      #res = cv2.resize(img, dsize=(255, 255))
      #imResized = imResized.reshape(256,256,3)
      imResized=imResized[None,:,:,:]
      out = model.predict(imResized)
      print(out)
      global softStorey
      if(out[0,0] >= 0.6):
          softStorey = True
          return jsonify({'message':'Your building is soft-story','bool':softStorey})
      else:
          softStorey=False
          return jsonify({'message':'Your building is not a soft-storey','bool':softStorey})

      return 'Image uploaded successfully', 200
    else:
      return jsonify({'error': 'Invalid file type'}), 400


@app.route('/soft-storey-floors',methods=["POST"])
def softStoreyFormula():
    #floors = request.args.get('floorData')
    print("hi")
    floorJson = request.get_json()
    print(floorJson)
    data = floorJson['floors']
    print(data)
    #num_list = [int(num) for num in floors.split(',')]
    numFloors = len(data)
    global softStorey
    if numFloors < 2:
        return jsonify({'error':'If number of floors is less please use the image'}), 400
    elif numFloors <= 3:
        for i in range(numFloors-1):
            if data[i] < 0.7*data[i+1]:
                softStorey = True
                return jsonify({'message':'Your building is a soft-story','bool':softStorey}), 200
        return jsonify({'message':'Your building is not a soft-story','bool':softStorey}), 200
    else:
        for i in range(numFloors-3):
            if data[i] < 0.8*((data[i+1]+data[i+2]+data[i+3])/3):
                softStorey = True
                return jsonify({'message':'Your building is a soft-story','bool':softStorey}), 200
        return jsonify({'message':'Your building is not a soft-story','bool':softStorey}), 200
        
@cross_origin()
@app.route('/zone-report',methods=['POST'])
def zone():
    data = request.get_json()
    zone = float(data['zone'])

    #Todo: Get the input of type of building from user and calculate importance factor
    importance = float(data['importance'])

    responseReductionFactor = 3 #For ordinary RC buildings


    soil = data['soil']
    height = float(data['height'])
    print(height)

    d = float(data['d'])
    print(d)
    if zone == 2:
        zoneVal = 0.1
    elif zone == 3:
        zoneVal = 0.16
    elif zone == 4:
        zoneVal = 0.24
    elif zone == 5:
        zoneVal = 0.36
    else:
        zoneVal = 0


    if d == 0:
        T = 0.075 * (height ** 0.75)
    else:
        T = 0.09*height/(d**(0.5))

    print(T)
    global softStorey

    if T <= 0.1:
        S = 1 + 15 * T
    else:
      if soil == 'rocky' or soil == 'hard':
          if T <= 0.4:
              S = 2.5
          elif T <= 4:
              S = 1/T
          else:
              S = 1
      elif soil == 'medium':
          if T <= 0.55:
              S = 2.5
          elif T <= 4:
              S = 1.36/T
          else:
              S = 1
      elif soil == 'soft':
          if T <= 0.67:
              S = 2.5
          elif T <= 4:
              S = 1.67/T
          else:
              S = 1
      else:
          S = 1

    print(soil)
    print(S)


    horizontalAccelerationCoeff = ((zoneVal*importance)/(responseReductionFactor*2))*S
    print(horizontalAccelerationCoeff)

    if softStorey == True:
        if horizontalAccelerationCoeff < 0.1:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is soft story but even during the earthquake the effect might be less but it is advised to reinforce your building"})
        elif horizontalAccelerationCoeff >= 0.1:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is soft story the effect of earthquake will be dangerous and it is advised to reinforce your building as soon as possible"})
        else:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is soft story and the effect of erathquake will be catastrophic"})
    else:
        if horizontalAccelerationCoeff < 0.1:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is not a soft story and during the earthquake the effect is less hence you are safe"})
        elif horizontalAccelerationCoeff >= 0.1:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is not a soft story the effect of earthquake will be moderately dangerous and it is advised to reinforce your building"})
        else:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is not a soft story but the effect of earthquake will be catastrophic"})
    #return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff})

if __name__ == "__main__":
   app.run(debug=True)
