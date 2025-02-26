from core.configs import pwd_context
from typing import Any

def hash_password(password:Any)->str:
    return pwd_context.hash(password)


def verify_password(password:Any,password_hash:str)->bool:
    return pwd_context.verify(password,password_hash)