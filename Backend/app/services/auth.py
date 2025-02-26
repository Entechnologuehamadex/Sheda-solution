from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import Buyer,Seller
from fastapi import status,HTTPException
from app.models.user import BaseUser
from sqlalchemy.future import select
from email_validator import validate_email,EmailNotValidError
import re
from core.configs import PHONE_REGEX
from app.schemas.auth_schema import LoginData,TokenData,OtpSchema,Token
from app.utils.utils import verify_password
from datetime import datetime,timezone
from core.configs import expire_delta,ALGORITHM,SECRET_KEY,logging
import jwt
from jwt.exceptions import InvalidTokenError
from sqlalchemy.exc import IntegrityError
from core.dependecies import DBSession,VerificationException
from app.schemas.user_schema import BaseUserSchema,BuyerCreate,SellerCreate
from app.utils.email import create_set_send_otp,verify_otp
from app.utils.enums import AccountTypeEnum
#NOTE - Create Buyer
async def create_buyer(request:BuyerCreate,db:AsyncSession):
    try:
        new_user = Buyer(**request.model_dump())
        new_user.verified = True
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return new_user
        logging.info(f'User {request.email} created')
    except IntegrityError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail='user already exists')
    except Exception as e: 
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(e))

#NOTE -  Create Seller
async def create_seller(request:SellerCreate,db:AsyncSession):
    new_user= Seller(**request.model_dump())
    try:
        db.add(new_user)
        new_user.verified = True
        await db.commit()
        await db.refresh(new_user)
        logging.info(f'User {request.email} created')
        return new_user
    except IntegrityError:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail='User already exists')
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(e))



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
        return result.scalar_one_or_none()  #NOTE - Fetch the first matching result safely
    
    
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

async def process_signup(user_data:BaseUserSchema):
    #NOTE -  Process OTP
    send_set_otp = await create_set_send_otp(user_data.email,user_data.model_dump())
    if send_set_otp:
        return user_data
    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail= 'unable to send confirmation email'
    )
async def process_verification(payload:OtpSchema,db:AsyncSession):
    user_data = await verify_otp(**payload.model_dump())
    if not user_data:
         raise VerificationException
    account_type = user_data.get('account_type')
    if account_type == AccountTypeEnum.buyer:
        user = BuyerCreate(**user_data)
        await create_buyer(user,db)
        access_token = await create_access_token(
        data={"sub": user.username}
        )
        logging.info(f'{user.email} Sucessfully verified and created')
        return Token(access_token=access_token, token_type="Bearer")
    
    user = SellerCreate(**user_data)
    await create_seller(user,db)
    access_token = await create_access_token(
    data={"sub": user.username}
    )
    return Token(access_token=access_token, token_type="Bearer")
    

