from sqlalchemy import create_engine, select, column
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Session

DATABASE_URL = 'postgresql://postgres:0053@localhost:5432/postgres'
engine = create_engine(DATABASE_URL)

class Base(DeclarativeBase): pass

def get_db():
    SessionLocal = sessionmaker(autoflush=False, bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()