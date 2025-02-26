import logging
from dotenv import load_dotenv
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from core.database import Base,engine
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta


load_dotenv()
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:     %(funcName)s: Line-%(lineno)d: %(message)s"
)


SIGN_UP_DESC ='''Once accounts are creaeted they are stored temporarily for 2 hours before deletion if email verification is not completed
'''


#NOTE - Regex for Phone
PHONE_REGEX = r'^\+\d{10,15}$'


#NOTE - Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='auth/login')
expire_delta = timedelta(days=30)

#NOTE - Debug mode
DEBUG_MODE = os.getenv('DEBUG_MODE')== 'True'

#NOTE -  Email Credential
EMAIL = os.getenv('EMAIL')
APP_PASS = os.getenv('APP_PASS')
EMAIL_HOST = os.getenv('EMAIL_HOST')

#NOTE - OTHER CONFIGS
REDIS_URL = os.getenv('REDIS_URL')
VERIFICATION_CODE_EXP_MIN = timedelta(minutes=int(os.getenv('VERIFICATION_CODE_EXP_MIN')))

#NOTE -  Templates Dir
Templates_dir = os.path.join(os.getcwd(),'app','templates')

#NOTE - Application startup
@asynccontextmanager
async def lifespan(app:FastAPI):
    async with engine.begin() as conn:
        if DEBUG_MODE:
            await conn.run_sync(Base.metadata.drop_all)
            logging.info('Tables Dropped')
        await conn.run_sync(Base.metadata.create_all)
        logging.info('Tables Created')
        
    yield
    


