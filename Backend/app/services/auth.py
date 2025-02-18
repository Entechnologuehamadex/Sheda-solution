from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import Buyer,Seller


#NOTE - Create Buyer
async def create_buyer(new_user:Buyer,db:AsyncSession):
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

#NOTE -  Create Seller
async def create_seller(new_user:Seller,db:AsyncSession):
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user
