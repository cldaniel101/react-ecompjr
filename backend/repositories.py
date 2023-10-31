from sqlalchemy.orm import Session

from models import Servico

class ServicoRepository:
    @staticmethod
    def find_all(db: Session) -> list[Servico]:
        return db.query(Servico).all()

    @staticmethod
    def save(db: Session, servico: Servico) -> Servico:
        if servico.id:
            db.merge(servico)
        else:
            db.add(servico)
        db.commit()
        return servico

    @staticmethod
    def find_by_id(db: Session, id: int) -> Servico:
        return db.query(Servico).filter(Servico.id == id).first()

    @staticmethod
    def exists_by_id(db: Session, id: int) -> bool:
        return db.query(Servico).filter(Servico.id == id).first() is not None

    @staticmethod
    def delete_by_id(db: Session, id: int) -> None:
        servico = db.query(Servico).filter(Servico.id == id).first()
        if servico is not None:
            db.delete(servico)
            db.commit()
