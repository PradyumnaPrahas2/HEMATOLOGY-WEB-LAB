import random
import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
b=sys.argv[1]
c=sys.argv[2]
print(c)
try:
    server=smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()
    server.login('pradyumnaprahas@gmail.com',"nfgy zqyw ejto rdfr")
    server.sendmail('pradyumnaprahas@gmail.com',c,b)
    print('mail sent')
except Exception as e:
    print(e)