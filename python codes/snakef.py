from collections import Counter
match = int(input())
ml = []
teams = []
for i in range(match):
    x=input()
    ml.append(x.split(';'))


def win(team):
    c = 0
    for j in ml:
        if j[0]==team:
            if j[2]=='win':
                c += 1
    return c
    
def draw(team):
    c = 0
    for j in ml:
        if j[2]=='draw':
            if team == j[0] or team == j[1]:
                c += 1
    return c
    
for i in range(len(ml)) :
    teams.append(ml[i][0])
    teams.append(ml[i][1])
x = Counter(teams).most_common()

def MP(team):
    for j in x:
        if j[0] == team:
            return j[1]
        else:
            continue
    
def lose(team):
    return MP(team)-win(team)-draw(team)
    
def p(team):
    return 3*win(team)+draw(team)
def c(text):
    return "|  {} ".format(text)

print('Team'+" "*20,'| MP ',c('W'),c('D'),c('L'),c('P'),'|',sep = '')
x.sort()
final = []
for i in x:
    z = i[0]+" "*(24-len(i[0]))+  c(MP(i[0]))   + c(win(i[0])) +c(draw(i[0])) +c(lose(i[0]))  +c(p(i[0]))+'|'                         
    final.append(z)
def cr(j):
    return int(j[len(j)-3])
final.sort(key=cr,reverse = True)
final2 = []
max=cr(final[0])
print(max)
ft = []
while max >=0:
    for i in final:
        if cr(i) ==max:
            ft.append(i)
        else:
            continue
        ft.sort()
        final2 += ft
        ft = []
        
        max -= 1
print(final2)
    





