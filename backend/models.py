from sqlalchemy import Column, Integer, String
from database import Base

class Servico(Base):
    __tablename__ = "serviços"  # Alteração no nome da tabela

    id: int = Column(Integer, primary_key=True, index=True)
    nome_completo: str = Column(String(100), nullable=False)
    email: str = Column(String(100), nullable=False)
    descricao: str = Column(String(300), nullable=False)
