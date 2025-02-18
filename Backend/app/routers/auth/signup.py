from fastapi import APIRouter,Depends,status
from app.models.user import Buyer,Seller
from app.schemas.user import BuyerCreate,SellerCreate,BaseUserSchema
from app.services.auth import create_buyer,create_seller
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db

router = APIRouter(tags=['Auth'],prefix='/auth/signup',)

@router.post('/buyer',response_model=BaseUserSchema,status_code=status.HTTP_201_CREATED)
async def signup(request:BuyerCreate,db:AsyncSession=Depends(get_db)):
    new_user = Buyer(**request.model_dump())
    return await create_buyer(new_user,db)

@router.post('/seller',
             response_model=BaseUserSchema,
             status_code=status.HTTP_201_CREATED)
async def signup(request:SellerCreate,db:AsyncSession=Depends(get_db)):
    new_user= Seller(**request.model_dump())
    return await create_seller(new_user,db)


    
    