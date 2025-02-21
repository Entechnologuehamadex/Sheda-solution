from pydantic import (BaseModel,
                      BeforeValidator,
                      EmailStr,
                      Field,)
from typing import Optional,Annotated
from  app.utils.enums import PhoneStr,AccountTypeEnum
from app.utils.utils import hash_password
from typing import Optional
from typing import Annotated


#NOTE - Base User Schema and response schema
class BaseUserSchema(BaseModel):
    username:Annotated[Optional[str],Field(example='username',default='Penivera',max_length=30)]
    email: Annotated[EmailStr,Field(examples=['penivera655@gmail.com'])]
    phone_number:Optional[PhoneStr]
    account_type:AccountTypeEnum
    fullname:str
    agency_name:Optional[str]
    location:Optional[str]=None
    class config:
        from_attributes = True
        
class BuyerCreate(BaseUserSchema):
    password:Annotated[str,BeforeValidator(hash_password),Field(example='password',default='test123!')]
    
class SellerCreate(BaseUserSchema):
    account_type:Annotated[AccountTypeEnum,Field(example='seller',default='seller')]
    password:Annotated[str,BeforeValidator(hash_password),Field(example='password',default='test123!')]
    
