from pydantic import BaseModel

class ServicoBase(BaseModel):
    nome_completo: str
    email: str
    descricao: str

class ServicoRequest(ServicoBase):
    ...

class ServicoResponse(ServicoBase):
    id: int

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    is_admin: bool = False

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool

    class Config:
        orm_mode = True