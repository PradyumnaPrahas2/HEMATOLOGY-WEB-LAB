import os
import random
import sys
from twilio.rest import Client
body1=str(sys.argv[1])
phno='+91'+str(sys.argv[2])
account_sid = 'enter your sid'
auth_token = 'enter_ur_id'
client = Client(account_sid, auth_token)

message = client.messages \
    .create(
         body=body1,
         from_='+-----------',
         to=phno,
     )

print(message.sid)
