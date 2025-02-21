from fastapi import Depends,Form,HTTPException,status
from core.database import get_db
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
from jinja2 import Environment, FileSystemLoader


env = Environment(loader=FileSystemLoader("app/templates"))


class CustomOAuth2PasswordRequestForm(OAuth2PasswordRequestForm):
    def __init__(self,
                 username:str = Form(description='Enter Phone,email,username',default='Penivera'),
                 password:str=Form(description='Enter Your Password',default='test123!')):
        
        super().__init__(username=username,password=password)



DBSession = Annotated[AsyncSession,Depends(get_db)]
PassWordRequestForm=Annotated[CustomOAuth2PasswordRequestForm, Depends()]


InvalidCredentialsException = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )


VerificationException = HTTPException(
    status_code = status.HTTP_400_BAD_REQUEST,
    detail='Invalid OTP Or Expired Token'
)