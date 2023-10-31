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
