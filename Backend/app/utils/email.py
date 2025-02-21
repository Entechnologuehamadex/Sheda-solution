import smtplib
#from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formatdate
from random import randint
from datetime import timedelta
import redis.asyncio as aioredis 
from core.configs import REDIS_URL,VERIFICATION_CODE_EXP_MIN,EMAIL,EMAIL_HOST,APP_PASS,logging
from core.dependecies import env,DBSession


redis = aioredis.from_url(REDIS_URL)

async def send_otp_mail(to_email,otp:str):
    template = env.get_template("otp_email.txt")
    text = template.render(otp=otp, 
                           expiry=VERIFICATION_CODE_EXP_MIN.total_seconds()/60, company_name="Sheda Solution", 
                           support_email=EMAIL)
    msg = MIMEMultipart()
    msg['From'] = EMAIL
    msg['To'] = to_email
    msg['Date'] = formatdate(localtime=True)
    msg['Subject'] = '🔐 Your OTP Code for Secure Verification'
    msg.attach(MIMEText(text,))
    try:
        smtp = smtplib.SMTP(EMAIL_HOST)
        smtp.starttls()
        smtp.login(user=EMAIL,password=APP_PASS)
        smtp.sendmail(EMAIL,to_email,msg.as_string())
        logging.info('OTP Mail Sent')
        return True
    except Exception as e:
        logging.error(f'Failed to send email \n{str(e)}')
        return False
        
async def create_set_send_otp(email:str,user_data:dict) -> int:
    otp= str(randint(1000,9999))
    await redis.setex(f'otp:{email}',timedelta(hours=2),otp)
    logging.info(f'otp saved to redis for {int(VERIFICATION_CODE_EXP_MIN)}')
    await redis.hset(f'user_data:{email}',mapping=user_data)
    logging.info('User data set to redis')
    await redis.expire(f'user_data:{email}',timedelta(hours=2))
    logging.info('timer set on user data 2 hours')
    send_otp = await send_otp_mail(email,otp)
    if send_otp:
        logging.info('OTP Sent')
        return True
    return False

async def verify_otp(otp:str,email:str):
    stored_otp = await redis.get(f'otp:{email}')
    if stored_otp and stored_otp.decode() == otp:
        logging.info(f'otp verified')
        user_data = await redis.hgetall(f'user_data:{email}')
        user_data ={key.decode():value.decode() for key,value in user_data.items()}
        logging.info(f'{email} Data retrieved from redis')
        await redis.delete(f'user_data:{email}')
        logging.info(f'{email} Data deleted from redis')
        return user_data
    logging.error('OTP not found')
    return False
    
    
    
        
    






