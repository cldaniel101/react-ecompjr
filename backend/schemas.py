from pydantic import BaseModel

class ServicoBase(BaseModel):
    """Esquema base para os dados do serviço."""
    nome_completo: str
    email: str
    descricao: str

class ServicoRequest(ServicoBase):
    """Esquema para os dados de requisição do serviço."""
    pass

class ServicoResponse(ServicoBase):
    """Esquema para a resposta do serviço, incluindo o ID."""
    id: int

    class Config:
        """Configuração para habilitar o modo ORM."""
        orm_mode = True
