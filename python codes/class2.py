from turtle import *
x = Turtle()
x.shape("turtle")
x.color("green","yellow")
x.speed(1)

stamp_ids = [0]*4

for i in range(4):
	x.fd(100)
	x.left(90)
	stamp_ids[i]=x.stamp()

x.color("blue")
x.backward(100)
x.clearstamp(stamp_ids[2])
x.reset()
exitonclick()