from fastapi import FastAPI, Depends, HTTPException, status, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from models import Servico, User
from database import engine, Base, get_db
from repositories import ServicoRepository, UserRepository
from schemas import ServicoRequest, ServicoResponse, UserCreate, UserLogin, UserResponse


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Rota de registro de usuário
@app.post("/api/users/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Hash da senha antes de armazenar no banco de dados
    hashed_password = pwd_context.hash(user.password)
    user = User(**user.dict(), password_hash=hashed_password)
    user = UserRepository.save(db, user)
    return user

# Rota de login
@app.post("/api/login/", response_model=UserResponse)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = UserRepository.find_by_username(db, user.username)
    if not db_user or not pwd_context.verify(user.password, db_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
        )
    return db_user

@app.post("/api/servicos", response_model=ServicoResponse, status_code=status.HTTP_201_CREATED)
def create(request: ServicoRequest, db: Session = Depends(get_db)):
    servico = ServicoRepository.save(db, Servico(**request.dict()))
    return servico

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
def delete_by_id(id: int, db: Session = Depends(get_db)):
    if not ServicoRepository.exists_by_id(db, id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Serviço não encontrado"
        )
    ServicoRepository.delete_by_id(db, id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@app.put("/api/servicos/{id}", response_model=ServicoResponse)
def update(id: int, request: ServicoRequest, db: Session = Depends(get_db)):
    if not ServicoRepository.exists_by_id(db, id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Serviço não encontrado"
        )
    servico = ServicoRepository.save(db, Servico(id=id, **request.dict()))
    return servico