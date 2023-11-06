from sqlalchemy.orm import Session
from passlib.context import CryptContext
from models import Servico, User

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

class UserRepository:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @staticmethod
    def find_by_username(db: Session, username: str) -> User:
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def find_by_id(db: Session, user_id: int) -> User:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def create_user(db: Session, user: User) -> User:
        user.password = UserRepository.pwd_context.hash(user.password)  # Hash da senha
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def verify_user_password(db: Session, username: str, password: str) -> User:
        user = UserRepository.find_by_username(db, username)
        if user and UserRepository.pwd_context.verify(password, user.password):
            return user
        return None