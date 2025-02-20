from pydantic import (BaseModel,
                      BeforeValidator,
                      EmailStr,
                      Field,)
from typing import Optional,Annotated
from  app.utils.enums import PhoneStr,AccountTypeEnum,KycStatusEnum
from app.utils.utils import hash_password
from typing import Optional
from datetime import datetime
from typing import Union

#NOTE - Base User Schema and response schema
class BaseUserSchema(BaseModel):
    profile_pic: Annotated[Optional[str],Field(None,example='https://example.com/image.jpg',)]
    email: EmailStr
    phone_number:PhoneStr
    account_type:AccountTypeEnum
    fullname:str
    agency_name:Optional[str]
    location:Optional[str]=None
    
    class config:
        from_attributes = True
        
class BuyerCreate(BaseUserSchema):
    password:Annotated[str,BeforeValidator(hash_password)]
    
class SellerCreate(BaseUserSchema):
    account_type:Annotated[AccountTypeEnum,Field(example='seller',default='seller')]
    password:Annotated[str,BeforeValidator(hash_password)]
    
class BuyerLogin(BaseModel):
    email:EmailStr
    password:str
    
class User(BaseUserSchema):
    id:int
    is_active:bool
    created_at:datetime
    updated_at:datetime
    verification_status:bool
    kyc_status:KycStatusEnum
    location:str
    class config:
        from_attributes = True
    
class UserInDB(User):
    account_type:AccountTypeEnum
    password:str
    
class Token(BaseModel):
    access_token:str
    token_type:str
    
    class config:
        from_attributes = True
        
class TokenData(BaseModel):
    username:Union[str,EmailStr,PhoneStr]
    
class LoginData(BaseModel):
    username:Union[EmailStr,PhoneStr,str]
    password:str