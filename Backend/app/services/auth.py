from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import Buyer,Seller
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Form,Depends
from fastapi import status,HTTPException
from core.database import get_db
from typing import Annotated
from app.models.user import BaseUser
from sqlalchemy.future import select
from email_validator import validate_email,EmailNotValidError
import re
from core.configs import PHONE_REGEX
from app.schemas.user import LoginData,TokenData
from app.utils.utils import verify_password
from datetime import datetime,timezone
from core.configs import expire_delta,ALGORITHM,SECRET_KEY,oauth2_scheme
import jwt
from jwt.exceptions import InvalidTokenError
from sqlalchemy.exc import IntegrityError

class CustomOAuth2PasswordRequestForm(OAuth2PasswordRequestForm):
    def __init__(self,
                 username:str = Form(description='Enter Phone,email,username'),
                 password:str=Form(description='Enter Your Password')):
        
        super().__init__(username=username,password=password)


#NOTE - Create Buyer
async def create_buyer(request:Buyer,db:AsyncSession):
    try:
        new_user = Buyer(**request.model_dump())
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return new_user
    except IntegrityError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail='User With One of the provided field already exists')
    except Exception as e: 
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(e))

#NOTE -  Create Seller
async def create_seller(request:Seller,db:AsyncSession):
    new_user= Seller(**request.model_dump())
    try:
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return new_user
    except IntegrityError:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail='User With One of the provided field already exists')
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(e))
DBSession = Annotated[AsyncSession,Depends(get_db)]


class GetUser:
    def __init__(self, db: AsyncSession, identifier: str):
        self.db = db
        self.identifier = identifier

    def __check_email(self) -> bool:
        """Check if the identifier is a valid email."""
        try:
            validate_email(self.identifier, check_deliverability=False)
            return True
        except EmailNotValidError:
            return False

    def __validate_phone(self) -> bool:
        """Check if the identifier is a valid phone number."""
        return bool(re.fullmatch(PHONE_REGEX, self.identifier))

    async def get_user(self):
        """Fetch a user based on email, phone, or username."""
        query = select(BaseUser)

        if self.__check_email():
            query = query.where(BaseUser.email == self.identifier)
        elif self.__validate_phone():
            query = query.where(BaseUser.phone_number == self.identifier)
        else:
            query = query.where(BaseUser.username == self.identifier)

        result = await self.db.execute(query)
        return result.scalar_one_or_none()  # Fetch the first matching result safely
    
    
async def get_user(db:DBSession,identifier:str)->BaseUser:
        user_fetcher = GetUser(db, identifier)
        user = await user_fetcher.get_user()
        return user

async def authenticate_user(db:AsyncSession,login_data:LoginData):
    user = await get_user(db,login_data.username)
    if not user:
        return False
    if not verify_password(login_data.password,user.password):
        return False
    return user

async def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc)+ expire_delta
    to_encode.update({'exp':expire})
    encoded_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwt

        
'''async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)],db:AsyncSession):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload:dict = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = await get_user(identifier=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    current_user: Annotated[BaseUser, Depends(get_current_user)],
):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
    '''

