import cv2
import numpy as np
import insightface
from insightface.app import FaceAnalysis
from insightface.data import get_image as ins_get_image
import matplotlib
matplotlib.use('TkAgg')  
import matplotlib.pyplot as plt
import tkinter


app = FaceAnalysis(name='buffalo_l')
app.prepare(ctx_id=0, det_size=(640, 640))


#getting the frame (game character) 
frame = cv2.imread('frame.png')


#getting faces from frame
facesDest = app.get(frame)
print(f"Detected  morgan {len(facesDest)} faces")
if len(facesDest) == 0:
    print("No faces detected")



#getting userimage and their faces
person = cv2.imread('sethu.jpeg')
facesScr = app.get(person)
print(f"Detected sethu {len(facesScr)} faces")
if len(facesScr) == 0:
    print("No faces detected")



#importing the swapper model (download link is in the video - under the reddit post comment)
swapper = insightface.model_zoo.get_model("/home/sethupathy/.insightface/models/inswapper_128.onnx")
sourcef = facesScr[0]

#copying
res = frame.copy()
#iterating through every face in the frame swap it with the user
for f in facesDest:
    res = swapper.get(res,f,sourcef,paste_back = True)

#to show the results
plt.imshow(res[:,:,::-1])
plt.show()



#Requirements:
#insightface
#onnxreader (i dont know the correct name smt like that)

#running it for the first will install insightface in your root
#manually download and add the swapper in installed folder
#use venv
