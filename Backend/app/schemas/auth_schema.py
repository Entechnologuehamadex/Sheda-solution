from pydantic import BaseModel,EmailStr,Field
from app.utils.enums import PhoneStr,AccountTypeEnum,KycStatusEnum
from app.schemas.user_schema import BaseUserSchema
from datetime import datetime
from typing import Union,Optional,Annotated

class TokenData(BaseModel):
    username:Union[str,EmailStr,PhoneStr]
    
class LoginData(BaseModel):
    username:Union[EmailStr,PhoneStr,str]
    password:str
    
class Token(BaseModel):
    access_token:str
    token_type:Optional[str] = 'Bearer'
    
class BuyerLogin(BaseModel):
    email:Annotated[EmailStr,Field(examples=['penivera655@gmail.com'])]
    password:str
    
class UserShow(BaseUserSchema):
    id:int
    is_active:bool
    created_at:datetime
    updated_at:datetime
    verification_status:bool
    kyc_status:KycStatusEnum
    location:str
    access_toke:Token
    class config:
        from_attributes = True
    
class UserInDB(UserShow):
    account_type:AccountTypeEnum
    password:str
    
    class config:
        from_attributes = True

class OtpSchema(BaseModel):
    email:EmailStr
    otp:Union[str,int]
        
