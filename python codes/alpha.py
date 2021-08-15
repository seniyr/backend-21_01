from turtle import *
def A(tur,w,h,x,y):
	tur.speed(1)
	tur.penup()
	tur.goto(x,y)
	tur.pendown()
	tur.goto(x+w//2,y+h)
	tur.goto(x+w,y)

	tur.penup()
	tur.goto(   ((x+w) +(x+w//2))//2   ,     y+ h//2 )
	tur.pendown()
	tur.goto(   ((x) +(x+w//2))//2   ,     y+ h//2 )

def v(tur,w,h,x,y):
	tur.speed(1)
	tur.penup()
	tur.goto(  x,  y+(2*w)//5    ) 
	tur.setheading(0) 
	tur.pendown()
	tur.circle((-2*w)//5  , 90 )
	tur.setheading(90)
	tur.circle((-3*w)//5 , 90)

def e(tur,w,h,x,y):
	tur.speed(1)
	tur.penup()
	tur.goto(  x+w/2 , y  ) 
	tur.pendown()
	tur.setheading(180)
	tur.circle(-w/2,270)
	tur.setheading(180)
	tur.fd(w)
	tur.penup()
	tur.goto(x+w/2,y)
	tur.pendown()
	tur.setheading(0)
	tur.fd((4/10)*w )

def r(tur,w,h,x,y):
	tur.speed(1)
	tur.penup()
	tur.goto(  x, y  ) 
	tur.pendown()
	tur.setheading(90)
	tur.fd(h)
	tur.backward(h/4)
	tur.right(30)
	tur.circle(-w/2,90)
	tur.setheading(270)
	tur.fd(h/8)

def d(tur,w,h,x,y):
	tur.speed(1)
	tur.penup()
	tur.goto(  x+w, y  ) 
	tur.pendown()
	tur.setheading(90)
	tur.fd(h)
	tur.backward(h)
	tur.left(90)
	tur.circle(-h/3,180)
	tur.penup()
	tur.goto(x+w,y)
	tur.pendown()
	tur.right(30)
	tur.circle(h,3)

def a(tur,w,h,x,y):
	tur.speed(1)
	tur.penup()
	tur.goto(  x+(5*w/6), y+(h/10)) 
	tur.pendown()
	tur.setheading(180)
	tur.circle(-h/2,200)
	tur.penup()
	tur.goto(  x+w, y)
	tur.pendown()
	tur.right(10) 
	tur.circle(h,5)
	tur.penup()
	tur.goto(  x+w, y)
	tur.setheading(90)
	tur.pendown()
	tur.fd(h)
	tur.circle(h/2,180)

def t(tur,w,h,x,y):
	tur.speed(1)
	tur.penup()
	tur.goto(  x+(w/2), y+(3*h/4)  ) 
	tur.pendown()
	tur.setheading(0)
	tur.fd(3*h/8)
	tur.backward(h/2)
	tur.fd(h/8)
	tur.right(90)
	tur.fd(3*h/4)
	tur.circle(h/6,120)
	tur.penup()
	tur.goto(  x+(w/2), y+(3*h/4)  ) 
	tur.setheading(90)
	tur.pendown()
	tur.fd(h/4)

def i(t,w,h,x,y):
	t.penup()
	t.goto(x+w/2,y)
	t.pendown()
	t.setheading(90)
	t.fd(h/2)
	t.penup()
	t.fd(h/10)
	t.pendown()
	t.stamp()
	t.penup()
	t.goto(x+w/2,y)
	t.pendown()
	t.setheading(0)
	t.right(30)
	t.circle(h/10,90)