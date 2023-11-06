from sqlalchemy import Column, Integer, String, Boolean
from passlib.context import CryptContext
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    is_admin = Column(Boolean, default=False)

class Servico(Base):
    __tablename__ = "serviços"

    id: int = Column(Integer, primary_key=True, index=True)
    nome_completo: str = Column(String(100), nullable=False)
    email: str = Column(String(100), nullable=False)
    descricao: str = Column(String(300), nullable=False)

