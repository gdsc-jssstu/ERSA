from flask import Flask
from flask_cors import CORS,cross_origin
from flask import request
from flask import jsonify
from werkzeug.utils import secure_filename
import base64
import numpy as np
import cv2
import re
import sys
import os
import glob
from load import *

app = Flask(__name__)

#Cross origin resource sharing
CORS(app)

global model

model = init()

#Constants and global variables
UPLOAD_FOLDER = 'images'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
softStorey = False

#Method to check the file type
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#soft-storey route for image classification
@app.route("/soft-story",methods=['POST'])
def upload_file():
    #Check if the picture is uploaded or not
    if 'picture' not in request.files:
        return 'No image uploaded', 400
    #Get the uploaded image
    image = request.files['picture']
    
    if image.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    
    #Check if the image is of the correct format
    if image and allowed_file(image.filename):
	#Store the image locally
      filename = secure_filename(image.filename)
      image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
	
	#Resize the image to fit to 256/256 for image classifire
      new_image = cv2.imread('images/'+image.filename)
      imResized = cv2.resize(new_image,(256,256))
      imResized = imResized/255.0
      imResized=imResized[None,:,:,:]
	
	#Predict whether the building is soft-storey or not my using the model
      out = model.predict(imResized)

      global softStorey
	#Check if the predicted value is greater than 0.6, if so then it is a soft-storey, else it is not
      if(out[0,0] >= 0.6):
          softStorey = True
          return jsonify({'message':'Your building is soft-story','bool':softStorey}), 200
      else:
          softStorey=False
          return jsonify({'message':'Your building is not a soft-storey','bool':softStorey}), 200

      return 'Image uploaded successfully', 200
    else:
      return jsonify({'error': 'Invalid file type'}), 400


#zone-report route for extensive analysis        
@cross_origin()
@app.route('/zone-report',methods=['POST'])
def zone():
	#Get the data from the request
    data = request.get_json()

	#zone value (2-5)
    zone = float(data['zone'])

    #iportance factor (1 or 1.5)
    importance = float(data['importance'])

    responseReductionFactor = 3 #For ordinary RC buildings

	#Type of soil (soft, hard, moderate)
    soil = data['soil']

	#height of building in meters
    height = float(data['height'])

	#Dimensions of the building
    d = float(data['d'])

	#assigning zone value based on the zone type
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


	#Calculating time period
    if d == 0:
        T = 0.075 * (height ** 0.75)
    else:
        T = 0.09*height/(d**(0.5))


    global softStorey

	#Calculating S based on tie period and soil type
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


	#Calculating horizontal acceleration coefficient 
    horizontalAccelerationCoeff = ((zoneVal*importance)/(responseReductionFactor*2))*S
    print(horizontalAccelerationCoeff)

	#logic to give extensive analysis to the user
    if softStorey == True:
        if horizontalAccelerationCoeff < 0.1:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is soft story but even during the earthquake the effect might be less but it is advised to reinforce your building"}), 200
        elif horizontalAccelerationCoeff >= 0.1:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is soft story the effect of earthquake will be dangerous and it is advised to reinforce your building as soon as possible"}), 200
        else:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is soft story and the effect of erathquake will be catastrophic"}), 200
    else:
        if horizontalAccelerationCoeff < 0.1:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is not a soft story and during the earthquake the effect is less hence you are safe"}), 200
        elif horizontalAccelerationCoeff >= 0.1:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is not a soft story the effect of earthquake will be moderately dangerous and it is advised to reinforce your building"}), 200
        else:
            return jsonify({'zone':zone,'bool':softStorey,'Ah':horizontalAccelerationCoeff,'message':"Your building is not a soft story but the effect of earthquake will be catastrophic"}), 200

if __name__ == "__main__":
   app.run(debug=True)
