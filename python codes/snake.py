from turtle import *
import time
import random

#movement loop functions
def move():
	if x.direction == "up":
		y = x.ycor()
		if y>=560:
			y = y -1020
		x.sety(y+20)


	if x.direction == "down":
		y = x.ycor()
		if y<=-560:
			y = y +1020
		x.sety(y-20)

	if x.direction == "right":
		y = x.xcor()
		if y>=560:
			y = y -1020
		x.setx(y+20)
	if x.direction == "left":
		y = x.xcor()
		if (y<=-520):
			y = y +1020
		x.setx(y-20)
def go_up():
	if x.direction != "down":
		x.setheading(90)
		x.direction = "up"
		
def go_down():
	if x.direction != "up":
		x.setheading(270)
		x.direction = "down"
		
def go_left():
	if x.direction != "right":
		x.direction = "left"
		x.setheading(180)
def go_right():
	if x.direction != "left":
		x.direction = "right"
		x.setheading(0)



# definig screen and head turtle
sc = Screen()
sc.title("python snake game")
sc.bgcolor("black")
sc.setworldcoordinates(-500,-500,500,500)
sc.screensize(1000,1000)
sc.tracer(0)



x = Turtle()
x.color("white","red")
x.shape("turtle")
x.resizemode("user")
x.shapesize(1,1,1)
x.penup()
x.setx(100)
x.sety(100)

# initial movement
x.speed(5)
x.direction = "stop"

#tail of snake 
tail = []
def add_tail():
	t = Turtle()
	t.color("red","white")
	t.speed(5)
	t.shape("square")
	t.resizemode("user")
	t.shapesize(1,1,1)
	t.penup()
	tail.append(t)
def move_snake(a,b):
	if len(tail)>0:
		tail[0].goto(a,b)
	for i in range(   len(tail)-1 , 0 , -1):
		xc= tail[i-1].xcor()
		yc= tail[i-1].ycor()
		tail[i].goto(xc,yc)

#food 
food = Turtle()
food.color("red")
food.shape("circle")
food.penup()
food.resizemode("user")
food.shapesize(0.5,0.5)

# score
pen = Turtle()
pen.speed(0)
pen.shape("square")
pen.color("white")
pen.penup()
z =Turtle()
z.color("blue")
z.penup()
z.goto(-500,500)
z.pendown()
for i in range(4):
	z.fd(1000)
	z.right(90)
pen.penup()
pen.hideturtle()

pen.goto(-400,400)




#keyboard listning
sc.listen()
score = 0
high_score=0
# game loop
while 1:
	sc.update()
	x.color("white","red")
	a,b = x.xcor(),x.ycor()
	move()
	sc.onkey(go_up,"w")
	sc.onkey(go_down,"s")
	sc.onkey(go_right,"d")
	sc.onkey(go_left,"a")

	rx=random.randint(-400,400)
	ry=random.randint(-400,400)
	if (x.distance(food) < 40):
		score += 1
		food.goto(rx,ry)

		x.color("green","blue")
		time.sleep(0.1)
		
		add_tail()
		pen.clear()
		pen.write("Score: {} High Score: {}".format(score,high_score), align="left", font=("Courier", 24, "normal"))
	# body collition
	for t in tail:
		if x.distance(t)<5:
			x.direction = "stop"
			time.sleep(2.0)
			for e in tail:
				e.goto(5000,5000)
			tail = []
			pen.clear()
			if score> high_score:
				high_score = score
			score = 0
			x.home()
			
			break






		
		

		
	
	time.sleep(0.2)
	
	
	move_snake(a,b)
	





exitonclick()