import os
import random
import sys
from twilio.rest import Client
body1=str(sys.argv[1])
phno='+91'+str(sys.argv[2])
account_sid = 'ACc67cebefa6722ececfa5e026588fa7d5'
auth_token = 'b33297f232ddb8d73d4e77abdad0d7fd'
client = Client(account_sid, auth_token)

message = client.messages \
    .create(
         body=body1,
         from_='+13344542087',
         to=phno,
     )

print(message.sid)