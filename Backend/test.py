import smtplib,csv
#from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formatdate
from random import randint
from datetime import timedelta
import sys
import redis.asyncio as redis 
import asyncio
redis = redis.from_url("redis://localhost", encoding="utf-8", decode_responses=True)


async def create_and_set_otp(user_id:str) -> int:
    otp= randint(1000,9999)
    await redis.setex(f'OTP:{user_id}',timedelta(minutes=1),otp)
    return str(otp)

async def send_email(send_to,send_from,text,subject):
    msg = MIMEMultipart()
    msg['From'] = send_from
    msg['To'] = send_to
    msg['Date'] = formatdate(localtime=True)
    msg['Subject'] = subject
    msg.attach(MIMEText(text))
    try:
        smtp = smtplib.SMTP('smtp.gmail.com: 587')
        smtp.starttls()
        smtp.login(user='charlesocean2024@gmail.com',password='kdqh gnld tass kiak')
        smtp.sendmail(send_from,send_to,msg.as_string())
        
    except Exception as e:
        print(f'failed to send email {str(e)}')

async def confirm_otp(user_id):
    OTP = await redis.get(f'OTP:{user_id}')
    print(OTP)
    while True:
        try:
            user_otp = input('Enter OTP sent to your email: ')
            if user_otp == OTP:
                print('OTP confirmed')
                sys.exit()
                break  # Exit the loop when the OTP is correct
            
            else:
                print('Invalid OTP. Please try again.')
        except Exception as e:
            print(f"An error occurred: {e}")
              
async def main():
    OTP = await redis.get('OTP:1234')
    print(OTP)
    otp = await create_and_set_otp('1234')
    await send_email(send_to='penivera655@gmail.com', send_from='charlesocean2024@gmail.com', text=otp, subject='Test OTP')
    await confirm_otp('1234')

if __name__ =='__main__':
    asyncio.run(main())
