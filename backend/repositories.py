from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from models import Servico

class ServicoRepository:
    @staticmethod
    def find_all(db: Session) -> list[Servico]:
        """Retorna todos os serviços."""
        return db.query(Servico).all()

    @staticmethod
    def save(db: Session, servico: Servico) -> Servico:
        """Salva um serviço no banco de dados."""
        try:
            if servico.id:
                db.merge(servico)
            else:
                db.add(servico)
            db.commit()
            return servico
        except SQLAlchemyError as e:
            db.rollback()
            raise e

    @staticmethod
    def find_by_id(db: Session, id: int) -> Servico:
        """Retorna um serviço pelo ID."""
        return db.query(Servico).filter(Servico.id == id).first()

    @staticmethod
    def exists_by_id(db: Session, id: int) -> bool:
        """Verifica se um serviço existe pelo ID."""
        return db.query(Servico).filter(Servico.id == id).exists().scalar()

    @staticmethod
    def delete_by_id(db: Session, id: int) -> None:
        """Exclui um serviço pelo ID."""
        servico = db.query(Servico).filter(Servico.id == id).first()
        if servico is not None:
            try:
                db.delete(servico)
                db.commit()
            except SQLAlchemyError as e:
                db.rollback()
                raise e
