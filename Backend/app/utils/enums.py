from pydantic import BaseModel,Field
from enum import Enum 
from typing import Annotated
from core.configs import PHONE_REGEX
#NOTE -  Custom datatype for Phone numbers
PhoneStr = Annotated[str,Field(
    examples=['+2348078417891',],
    description='Phone number in international format',
    pattern=PHONE_REGEX,
    min_length=10,
    max_length=15,
)]

class AccountTypeEnum(str,Enum):
    buyer = 'buyer'
    seller = 'seller'
    
class KycStatusEnum(str,Enum):
    pending = 'pending'
    verified = 'verified'
    rejected = 'rejected'
    

