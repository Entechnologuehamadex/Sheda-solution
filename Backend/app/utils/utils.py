from core.configs import pwd_context
from typing import Any

def hash_password(password:Any)->str:
    return pwd_context.hash(password)
