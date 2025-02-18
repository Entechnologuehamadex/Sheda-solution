from core.database import Base
from sqlalchemy import (String,
                        Boolean,
                        Float,
                        Enum,
                        DateTime,
                        ForeignKey,
                        CheckConstraint,
                        JSON)
from sqlalchemy.orm import mapped_column,Mapped
from datetime import datetime
from app.utils.enums import AccountTypeEnum
from typing import Optional

#NOTE - Base User Model
class BaseUser(Base):
    __tablename__ = 'users'
    id: Mapped[int]= mapped_column('id',primary_key=True,autoincrement=True)
    profile_pic:Mapped[str] = mapped_column(String(30),nullable=True,)
    email :Mapped[str]= mapped_column(String,unique=True,nullable=False,)
    phone_number:Mapped[str]=mapped_column(String(15),nullable=False,unique=True,)
    password:Mapped[str]=mapped_column(String,nullable=False,)
    account_type:Mapped[AccountTypeEnum]= mapped_column(Enum(AccountTypeEnum),nullable=False,default=AccountTypeEnum.buyer)
    is_active:Mapped[bool] = mapped_column(Boolean,default= True,)
    created_at: Mapped[datetime]= mapped_column(DateTime,default=datetime.now,)
    updated_at:Mapped[datetime]= mapped_column(DateTime,default=datetime.now,onupdate=datetime.now,)
    verification_status:Mapped[bool] = mapped_column(Boolean,default=False,)
    __mapper_args__ = {
        "polymorphic_identity": "users",
        "polymorphic_on": account_type,
    }
    #NOTE -  Table constraint on manual level
    __table_args__ = (
        CheckConstraint(
            f"account_type IN {tuple(item.value for item in AccountTypeEnum)}",
            name="check_account_type"
        ),
    )
    
#NOTE -  Buyer Model
class Buyer(BaseUser):
    __tablename__ = 'buyers'
    id: Mapped[int]= mapped_column(ForeignKey('users.id'),primary_key=True,)
    fullname:Mapped[str]=mapped_column(String(50),nullable=False,)
    agency_name:Mapped[Optional[str]]=mapped_column(String(50),nullable=True,)
    kyc_status:Mapped[bool]=mapped_column(Boolean,default=False,)
    __mapper_args__ = {
        "polymorphic_identity": AccountTypeEnum.buyer,
    }
   
#NOTE -  Seller Model 
class Seller(BaseUser):
    __tablename__ = 'sellers'
    id: Mapped[int]= mapped_column(ForeignKey('users.id'),primary_key=True,)
    fullname:Mapped[str]=mapped_column(String(50),nullable=False,)
    agency_name:Mapped[Optional[str]]=mapped_column(String(50),nullable=True,)
    kyc_status:Mapped[bool]=mapped_column(Boolean,default=False,)
    __mapper_args__ = {
        "polymorphic_identity": AccountTypeEnum.seller,
    }