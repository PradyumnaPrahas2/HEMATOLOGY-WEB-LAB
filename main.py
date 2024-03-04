import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Set your email credentials and details
sender_email = "your_email@gmail.com"
receiver_email = "recipient_email@gmail.com"
password = "your_email_password"

# Create the email message
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = "Subject of the email"

body = "Content of the email."
message.attach(MIMEText(body, "plain"))

# Connect to the SMTP server (for Gmail, use port 587)
with smtplib.SMTP("smtp.gmail.com", 587) as server:
    server.starttls()  # Enable encryption for the connection
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message.as_string())

print("Email sent successfully!")