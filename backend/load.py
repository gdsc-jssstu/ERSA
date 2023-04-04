import tensorflow as tf


def init(): 
	json_file = open('model.json','r')
	loaded_model_json = json_file.read()
	json_file.close()
	loaded_model = tf.keras.models.model_from_json(loaded_model_json)
	
	#load weights into new model
	loaded_model.load_weights("softstoryclassifier.h5")
	print("Loaded Model from disk")

	#compile and evaluate loaded model
	loaded_model.compile(loss=tf.losses.BinaryCrossentropy(),optimizer='adam',metrics=['accuracy'])

	return loaded_model
