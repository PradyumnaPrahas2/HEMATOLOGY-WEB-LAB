# from flask import Flask
# app= Flask(__name__)
# @app.route("/location")
# def location():
#     import requests
#     import re
#     import json
#     from bs4 import BeautifulSoup
#     from requests import Session
#     import sys
#     session=requests.Session()
#     x=sys.argv[1]
#     y=sys.argv[2]
#     country=str(x).lower()#input('Enter country: ').lower()
#     city=str(y).lower()#input('Enter city: ').lower()
#     url="https://www.timeanddate.com/worldclock/"+country+"/"+city
#     res1=session.get(url)
#     res1,url
#     soup=BeautifulSoup(res1.text,"html.parser")
#         #print(soup)
#     p=soup.find('span',attrs={'id':"ct"})
#     tz=soup.find('span',attrs={'id':'cta'})
#     date=soup.find('span',attrs={'id':'ctdat'})
#     w=soup.find('div',attrs={'id':'wt-tp'})
#         # print("Time in "+country+"'s "+"city is "+p.text+" "+tz.text)
#         # print("Date:",date.text)
#         # print("Weather in "+country+"'s "+city+" is "+w.text)
#     l1=['time','date','temperature','climate']
#         # print(p.text+tz.text)
#         # print(date.text)
#         # print(w.text)
#     dv=soup.find_all('p',attrs={'class':None,'span':None,'id':None})
#     for x in dv:
#         #     condition=re.search('\s.\d',x.text)
#         if(x.text[-1]=='C'):
#             y=x.text
#     l2=[]
#     l2.append(p.text+" "+tz.text)
#     l2.append(date.text)
#     l2.append(w.text)
#     l2.append(y)
#     return {'time':l2[0],'date':l2[1],'temperature':l2[2],'climate':l2[3],'timeforref':int(p.text[:2])}
# if __name__=='__main__':
#     app.run(debug=True)
try:
    import requests
    import re
    import json
    from bs4 import BeautifulSoup
    from requests import Session
    import sys
    session=requests.Session()
    x=sys.argv[1]
    y=sys.argv[2]
    country=str(x).lower()#input('Enter country: ').lower()
    city=str(y).lower()#input('Enter city: ').lower()
    url="https://www.timeanddate.com/worldclock/"+country+"/"+city
    res1=session.get(url)
    res1,url
    soup=BeautifulSoup(res1.text,"html.parser")
            #print(soup)
    p=soup.find('span',attrs={'id':"ct"})
    tz=soup.find('span',attrs={'id':'cta'})
    date=soup.find('span',attrs={'id':'ctdat'})
    w=soup.find('div',attrs={'id':'wt-tp'})
            # print("Time in "+country+"'s "+"city is "+p.text+" "+tz.text)
            # print("Date:",date.text)
            # print("Weather in "+country+"'s "+city+" is "+w.text)
    l1=['time','date','temperature','climate']
            # print(p.text+tz.text)
            # print(date.text)
            # print(w.text)
    dv=soup.find_all('p',attrs={'class':None,'span':None,'id':None})
    for x in dv:
            #     condition=re.search('\s.\d',x.text)
        if(x.text[-1]=='C'):
            y=x.text
    l2=[]
    l2.append(p.text+" "+tz.text)
    l2.append(date.text)
    l2.append(w.text)
    l2.append(y)
    print(l2[0]+'\n'+l2[2]+'\n'+l2[3])
except Exception as e:
    print(str(e))