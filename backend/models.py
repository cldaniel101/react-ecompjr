from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"

    id: int = Column(Integer, primary_key=True, index=True)
    username: str = Column(String, unique=True, index=True, nullable=False)
    email: str = Column(String, unique=True, index=True, nullable=False)
    password: str = Column(String, nullable=False) 
    is_admin: bool = Column(Boolean, default=False)

class Servico(Base):
    __tablename__ = "serviços"

    id: int = Column(Integer, primary_key=True, index=True)
    nome_completo: str = Column(String(100), nullable=False)
    email: str = Column(String(100), nullable=False)
    descricao: str = Column(String(300), nullable=False)

