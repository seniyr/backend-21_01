""" import cv2
import numpy as np

videocodec = cv2.VideoWriter_fourcc(*'XVID')
outfile = cv2.VideoWriter('file2.avi',videocodec,60,(640,480))
web = cv2.VideoCapture(0)
def nothing(x):
    pass
cv2.namedWindow('hsv')
cv2.createTrackbar('lh','hsv' ,0 ,180 ,nothing)
cv2.createTrackbar('ls','hsv' ,0 ,255 ,nothing)
cv2.createTrackbar('lv','hsv' ,0 ,255, nothing)
cv2.createTrackbar('uh','hsv' ,180 ,180 ,nothing)
cv2.createTrackbar('us','hsv' ,255 ,255 ,nothing)
cv2.createTrackbar('uv','hsv' ,255 ,255 ,nothing)

while 1:
    
    t,frame = web.read()
    if t:
       
        h1 = cv2.getTrackbarPos('lh','hsv')
        s1 = cv2.getTrackbarPos('ls','hsv')
        v1 = cv2.getTrackbarPos('lv','hsv')
        h2 = cv2.getTrackbarPos('uh','hsv')
        s2 = cv2.getTrackbarPos('us','hsv')
        v2 = cv2.getTrackbarPos('uv','hsv')
        
        
        hsv= cv2.cvtColor(frame,cv2.COLOR_BGR2HSV)
        l = np.array([113,121,66])
        u = np.array([134,255,255])
        mask = cv2.inRange(hsv,l,u)
        red_mask = cv2.bitwise_and(frame,frame,mask = mask)


        cntr , heirachy =  cv2.findContours(mask,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

        for i in cntr:
            area = cv2.contourArea(i)
            if area>300:
                
                cv2.drawContours(red_mask,i,-1,(0,255,0),3)
                peri = cv2.arcLength(i,True)
                approx = cv2.approxPolyDP(i,0.02*peri,True)
                x, y, w, h = cv2.boundingRect(approx)
                cv2.rectangle(red_mask, (x,y),(x+w, y+h),(255,0,0),2)
                
        cv2.imshow('nothing',frame)
        cv2.imshow('mask',red_mask)
        outfile.write(frame)
        
        if cv2.waitKey(1) == 27:
            break
web.release()
outfile.release()
cv2.destroyAllWindows()


"""

for i in range(91,143):
    print("=Transpose(Data!B{}:M{})".format(i,i) )
