'''
手写数字识别
'''

import pickle
import cv2
import uuid
import numpy as np

from . import network, mnist_loader

#加载模型
net = network.Network([784, 30, 10])
net.loadmodel("digits/models/model.pkl")

#training_data, validation_data, test_data = mnist_loader.load_data_wrapper()
#test_data = list(test_data)
#print("Epoch {} : {} / {}".format(1, net.evaluate(test_data), len(test_data)));

#识别指定的图像数据
def RecognizeImageData(image_data):
	#filename = "img_library/" + str(uuid.uuid1()) + ".png"
	#f = open(filename, 'wb')
	#f.write(image_data)
	#f.close()

	file_bytes = np.asarray(bytearray(image_data), dtype=np.uint8)
	img_data_ndarray = cv2.imdecode(file_bytes, cv2.IMREAD_GRAYSCALE)
	ret, img_data_ndarray = cv2.threshold(img_data_ndarray, 20, 255, cv2.THRESH_BINARY)
	img_data_ndarray = cv2.resize(img_data_ndarray, (28, 28), cv2.INTER_LINEAR)
	#cv2.imwrite("tmp.png", img_data_ndarray)
	#print(img_data_ndarray)
	img_data_ndarray = img_data_ndarray / 255.0
	#print(img_data_ndarray)
	img_data_ndarray = np.reshape(img_data_ndarray, (784, 1))
	result = np.argmax(net.feedforward(img_data_ndarray))
	return str(result)