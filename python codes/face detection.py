
import cv2
import numpy as np

faceCascade = cv2.CascadeClassifier('data/haarcascades/haarcascade_frontalface_default.xml')

VideoCam = cv2.VideoCapture(0)

while True:
    # step 1: read image from video
    ret, frame = VideoCam.read()
    # step 2: convert BGR frame into grayscale
    grayframe = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # step 3: Detect faces in gray image
    faces = faceCascade.detectMultiScale(
        grayframe,
        scaleFactor=1.2,
        minNeighbors=5,     
        minSize=(20, 20)  )
    print(faces)
    #step 4: for each parameters of faces draw rectangle on original frame
    for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)

    # step 5: show image frame with face rectangle in video 
    cv2.imshow('Face Detection',frame)

    if cv2.waitKey(500) == 27:
        break

VideoCam.release()
cv2.destroyAllWindows()
