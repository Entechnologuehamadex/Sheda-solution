import logging
from dotenv import load_dotenv
import os

load_dotenv()
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:     %(funcName)s: Line-%(lineno)d: %(message)s"
)
sqlite_filename = 'database.db'

db_url= f'sqlit+aiosqlite:///.{sqlite_filename}'


