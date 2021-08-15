from turtle import *
import time
import random

# defining a screen and a Turtle head
s =Screen()
s.bgcolor('black')
s.title('My Snake Game')

s.setworldcoordinates(-500,-500,500,500)

#boundry pen
b = Turtle()
b.pencolor('white')
b.penup()
b.goto(-700,-700)
b.setheading(0)
b.pendown()
tracer(False)
for i in range(4):
	b.fd(1400)
	b.left(90)
s.update()
tracer(True)


#head or main turtle
h = Turtle()
h.color('white','green')
h.shape('turtle')

h.resizemode('user') # we are telling computer that we want to resize turtle, so setting it to user.
h.shapesize(1,1,1)
h.direction = "stop"
#food turtle
f = Turtle()
f.color('red')
f.shape('circle')
f.penup()
f.shapesize(0.5,0.5)
f.goto(random.randint(-500,500) , random.randint(-500,500))


#initial movementwa
h.speed(10)
h.setheading(180)
h.penup()
print(h.heading())
#Movement for snake
# we use tracer(Flase) to turn off the animation or basicly just sleepclose our eyes.
#we use screen.update() to open our eyes for a instance and see what is on the screen.
# so if car started from home and reached office in 10 minutes, with our eyes open, we will see entire animation
# and so feel that car took 10 minutes. but if we sleep and or open our eyes only at start and end, we will see
#that car leaved and arrivaed instantly. since we only saw thode two things, not the entire journey. 
def move(h,step):
	if h.direction == "up": #North
		y = h.ycor()
		h.sety(y+step)

		if y>500:
			#tracer(False)   this was for snake leaving from one side and emerging onother side
			
			h.sety(-500)
			
			# s.update()
			# tracer(True)

	if h.direction == "right": #east
		x = h.xcor()
		h.setx(x+step)

		if x>500:
			
			h.setx(-500)
			
			


	if h.direction == "left": #west
		x = h.xcor()

		h.setx(x-step)
		if x<-500:
			
			h.setx(500)
			


	if h.direction == "down": #south
		y = h.ycor()
		h.sety(y-step)
		if y<-500:
			
			h.sety(500)
			

# changing directions according to buttonns
def go_down():
	if h.direction != "up":
		h.direction = "down"
		h.setheading(270) 


def go_right():
	if h.direction != "left":
		h.direction = "right"
		h.setheading(0)


def go_left():
	if h.direction != "right":
		h.direction = "left"
		h.setheading(180)



def go_up():
	if h.direction != "down":
		h.direction = "up"
		h.setheading(90)


s.listen()
tracer(False) # we need to do it before move and again turn it one. but since it is in while loop. there is 
#no use of turning it on again as in next loop, this will be turned off again. so remove turning on
#now sincet
#tail of turtle
tail=[]
def add_tail():
	#creating a boogie of train
	a = Turtle()
	a.color('red','white')
	a.shape('square')
	a.shapesize(0.9)	
	a.penup()
	#adding this newly made boggie to tail of train
	tail.append(a)
def move_tail():
	rev = tail[::-1] #reversing list so  first element is last added boggie, adnd last element is ver y first boggie
	for i in range(len(tail)):
		if i== len(tail)-1:
			tail[i].goto(h.xcor(),h.ycor())
			move(h,14) # add this to part in while loop when it eats the food if you want speed not to chnage
		# eg. moving 2nd boggie in tail to the x and y cordinate of 2+1=3rd boggie in tail.
		else:
			tail[i].goto(tail[i+1].xcor()  , tail[i+1].ycor())
# score
pen = Turtle()
pen.speed(0)
pen.shape("square")
pen.color("white")
pen.hideturtle()
pen.penup()

pen.goto(-400,400)
score = 0
high_score = 0
while True:

	s.onkey(go_up,'w')
	s.onkey(go_down,'s')
	s.onkey(go_left,'a')
	s.onkey(go_right,'d')
	
	move(h,20)
	move_tail()

	#food randomly appearing
	fx =random.randint(-500,500)
	fy= random.randint(-500,500)
	if h.distance(f)<40:
		f.goto(fx,fy)
		h.color('orange','blue')
		s.update()
		time.sleep(0.2)
		score += 1
		pen.clear()
		pen.write("Score: {} High Score: {}".format(score,high_score), align="left", font=("Courier", 24, "normal"))
		#adding tail
		add_tail()
	#checking for collision
	for t in tail:
		print(h.distance(t))
		if h.distance(t)<14:


			h.direction = "stop"
			time.sleep(2.0)
			for e in tail:
				e.goto(5000,5000)
			tail = []
			pen.clear()
			high_score =score 
			
			h.home()
			
			break

		
	s.update()

	time.sleep(0.2)
	h.color('green','green')
	


exitonclick()
