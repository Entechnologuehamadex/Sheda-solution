from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker


sqlite_filename = 'database.db'
db_url= f'sqlite+aiosqlite:///./{sqlite_filename}'
engine = create_async_engine(url=db_url)
connect_args ={'check_same_thread':False}
AsyncSessionLocal = async_sessionmaker(bind=engine)
Base = declarative_base()

async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    except Exception:
        await db.rollback()
        raise
    finally:
        await db.close()