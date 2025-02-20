from fastapi import APIRouter,Depends,status,HTTPException
from app.models.user import Buyer,Seller
from app.schemas.user import BuyerCreate,SellerCreate,BaseUserSchema,Token,User
from app.services.auth import create_buyer,create_seller
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from typing import Annotated
from app.services.auth import CustomOAuth2PasswordRequestForm,authenticate_user,create_access_token,get_current_active_user
from app.schemas.user import LoginData



DBSession = Annotated[AsyncSession,Depends(get_db)]
router = APIRouter(tags=['Auth'],prefix='/auth/signup',)

@router.post('/buyer',response_model=BaseUserSchema,status_code=status.HTTP_201_CREATED)
async def signup(request:BuyerCreate,db:AsyncSession=Depends(get_db)):
    
    return await create_buyer(request,db)

@router.post('/seller',
             response_model=BaseUserSchema,
             status_code=status.HTTP_201_CREATED)
async def signup(request:SellerCreate,db:AsyncSession=Depends(get_db)):
    
    return await create_seller(request,db)

@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[CustomOAuth2PasswordRequestForm, Depends()],db:DBSession
) -> Token:
    login_data = LoginData(**form_data.__dict__)
    user:User = await authenticate_user(db, login_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = await create_access_token(
        data={"sub": user.username}
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[BaseUserSchema, Depends(get_current_active_user)],
):
    return current_user


    
    