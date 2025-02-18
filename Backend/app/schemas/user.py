from pydantic import (BaseModel,
                      BeforeValidator,
                      EmailStr,
                      Field,)
from typing import Optional,Annotated
from  app.utils.enums import PhoneStr,AccountTypeEnum
from app.utils.utils import hash_password
from typing import Optional
#NOTE - Base User Schema and response schema
class BaseUserSchema(BaseModel):
    profile_pic: Annotated[Optional[str],Field(None,example='https://example.com/image.jpg',)]
    email: EmailStr
    phone_number:PhoneStr
    account_type:AccountTypeEnum
    fullname:str
    agency_name:Optional[str]
    
    class config:
        from_attributes = True
class BuyerCreate(BaseUserSchema):
    password:Annotated[str,BeforeValidator(hash_password)]
    
class SellerCreate(BaseUserSchema):
    password:Annotated[str,BeforeValidator(hash_password)]
    
class BuyerLogin(BaseModel):
    email:EmailStr
    password:str