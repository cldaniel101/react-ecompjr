from fastapi import FastAPI, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from models import Servico
from database import engine, Base, get_db
from repositories import ServicoRepository
from schemas import ServicoRequest, ServicoResponse

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.post("/api/servicos", response_model=ServicoResponse, status_code=status.HTTP_201_CREATED)
def create(request: ServicoRequest, db: Session = Depends(get_db)):
    servico = ServicoRepository.save(db, Servico(**request.model_dump()))
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
    servico = ServicoRepository.save(db, Servico(id=id, **request.model_dump()))
    return servico
