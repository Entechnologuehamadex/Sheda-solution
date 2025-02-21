from fastapi import APIRouter,Depends,status,HTTPException
from app.schemas.user_schema import BuyerCreate,SellerCreate,BaseUserSchema
from app.services.auth import process_signup,process_verification
from typing import Annotated
from app.services.auth import authenticate_user,create_access_token
from core.dependecies import PassWordRequestForm
from core.dependecies import DBSession,InvalidCredentialsException,VerificationException
from app.schemas.auth_schema import LoginData,UserShow,Token,OtpSchema
from core.configs import SIGN_UP_DESC




router = APIRouter(tags=['Auth'],prefix='/auth',)

@router.post('/signup/buyer',
             response_model=BaseUserSchema,
             status_code=status.HTTP_201_CREATED,
             description=SIGN_UP_DESC)
async def signup_buyer(request:BuyerCreate):
    #NOTE - Process signup
    return await process_signup(request)

@router.post('/signup/seller',
             response_model=BaseUserSchema,
             status_code=status.HTTP_201_CREATED,
             description=SIGN_UP_DESC)
async def signup_seller(request:SellerCreate):
    
    return await process_signup(request)

#NOTE - Verification Endpoint
@router.post('/verify',response_model=Token)
async def verify_account(payload:OtpSchema,db:DBSession):
    
        return await process_verification(payload,db)


#NOTE - Login Route
@router.post("/login",response_model=Token)
async def login_for_access_token(form_data: PassWordRequestForm,db:DBSession) -> Token:
    login_data = LoginData(**form_data.__dict__)
    user:UserShow = await authenticate_user(db, login_data)
    if not user:
        raise InvalidCredentialsException
    access_token = await create_access_token(
        data={"sub": user.username}
        )
    return Token(access_token=access_token, token_type="Bearer")






    
    