from fastapi import FastAPI, Depends, HTTPException, status, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi_users import FastAPIUsers, models
from fastapi_users.db import SQLAlchemyUserDatabase
from fastapi_users.authentication import JWTAuthentication

from models import Servico
from database import engine, Base, get_db
from repositories import ServicoRepository
from schemas import ServicoRequest, ServicoResponse

# Crie uma instância do FastAPI
app = FastAPI()

# Configuração de origem cruzada (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Defina o seu modelo de usuário administrador
class User(models.BaseUser):
    pass

# Configure a autenticação JWT
SECRET = "YOUR_SECRET_KEY"  # Substitua por uma chave secreta segura
auth_backends = []

auth_backends.append(JWTAuthentication(secret=SECRET, lifetime_seconds=3600))

# Configure o banco de dados para usuários
user_db = SQLAlchemyUserDatabase(UserDB, database=Base, user_db_model=UserDB)

# Crie uma instância do FastAPIUsers para gerenciar usuários e autenticação
fastapi_users = FastAPIUsers(
    user_db, auth_backends, User, UserDB
)

@app.post("/api/servicos", response_model=ServicoResponse, status_code=status.HTTP_201_CREATED)
def create(request: ServicoRequest, db: Session = Depends(get_db), current_user: User = Depends(fastapi_users.current_user())):
    if current_user.is_superuser:
        servico = ServicoRepository.save(db, Servico(**request.model_dump()))
        return servico
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Apenas administradores podem criar servicos")

@app.get("/api/servicos", response_model=list[ServicoResponse])
def get_all(db: Session = Depends(get_db)):
    servicos = ServicoRepository.find_all(db)
    return [servico for servico in servicos]

@app.get("/api/servicos/{id}", response_model=ServicoResponse)
def find_by_id(id: int, db: Session = Depends(get_db)):
    servico = ServicoRepository.find_by_id(db, id)
    if not servico:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Serviço não encontrado"
        )
    return servico

@app.delete("/api/servicos/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_by_id(id: int, db: Session = Depends(get_db), current_user: User = Depends(fastapi_users.current_user())):
    if current_user.is_superuser:
        if not ServicoRepository.exists_by_id(db, id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Serviço não encontrado"
            )
        ServicoRepository.delete_by_id(db, id)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Apenas administradores podem excluir servicos")

@app.put("/api/servicos/{id}", response_model=ServicoResponse)
def update(id: int, request: ServicoRequest, db: Session = Depends(get_db), current_user: User = Depends(fastapi_users.current_user())):
    if current_user.is_superuser:
        if not ServicoRepository.exists_by_id(db, id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Serviço não encontrado"
            )
        servico = ServicoRepository.save(db, Servico(id=id, **request.model_dump()))
        return servico
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Apenas administradores podem atualizar servicos")
