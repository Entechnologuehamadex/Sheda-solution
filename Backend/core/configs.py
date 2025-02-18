import logging
from dotenv import load_dotenv
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from core.database import Base,engine
from passlib.context import CryptContext
load_dotenv()
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:     %(funcName)s: Line-%(lineno)d: %(message)s"
)
#NOTE - Regex for Phone
PHONE_REGEX = r'^\+\d{10,15}$'
#NOTE - Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
#NOTE - Debug mode
DEBUG_MODE = os.getenv('DEBUG_MODE')== 'True'
#NOTE - Database Setup
sqlite_filename = 'database.db'

db_url= f'sqlit+aiosqlite:///.{sqlite_filename}'

@asynccontextmanager
async def lifespan(app:FastAPI):
    async with engine.begin() as conn:
        if DEBUG_MODE:
            await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        
    yield
    

