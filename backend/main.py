from fastapi import FastAPI, Depends, HTTPException, status, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from models import Servico
from database import engine, Base, get_db
from repositories import ServicoRepository
from schemas import ServicoRequest, ServicoResponse

# Criando tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Criando instância do aplicativo FastAPI
app = FastAPI()

# Adicionando middleware CORS para permitir solicitações da origem específica
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rota para criar um novo serviço
@app.post("/api/servicos", response_model=ServicoResponse, status_code=status.HTTP_201_CREATED)
def create(request: ServicoRequest, db: Session = Depends(get_db)):
    """
    Cria um novo serviço com base nos dados fornecidos.
    """
    servico = ServicoRepository.save(db, Servico(**request.dict()))
    return servico

# Rota para obter todos os serviços
@app.get("/api/servicos", response_model=list[ServicoResponse])
def get_all(db: Session = Depends(get_db)):
    """
    Obtém todos os serviços cadastrados.
    """
    servicos = ServicoRepository.find_all(db)
    return [servico for servico in servicos]

# Rota para obter um serviço pelo ID
@app.get("/api/servicos/{id}", response_model=ServicoResponse)
def find_by_id(id: int, db: Session = Depends(get_db)):
    """
    Obtém um serviço específico com base no ID fornecido.
    """
    servico = ServicoRepository.find_by_id(db, id)
    if not servico:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Serviço não encontrado"
        )
    return servico

# Rota para excluir um serviço pelo ID
@app.delete("/api/servicos/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_by_id(id: int, db: Session = Depends(get_db)):
    """
    Exclui um serviço com base no ID fornecido.
    """
    if not ServicoRepository.exists_by_id(db, id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Serviço não encontrado"
        )
    ServicoRepository.delete_by_id(db, id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

# Rota para atualizar um serviço pelo ID (Ainda não implementado no frontend)
@app.put("/api/servicos/{id}", response_model=ServicoResponse)
def update(id: int, request: ServicoRequest, db: Session = Depends(get_db)):
    """
    Atualiza um serviço existente com base no ID fornecido.
    """
    if not ServicoRepository.exists_by_id(db, id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Serviço não encontrado"
        )
    servico = ServicoRepository.save(db, Servico(id=id, **request.dict()))
    return servico