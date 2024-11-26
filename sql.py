from sqlalchemy import create_engine, Column, BIGINT, VARCHAR, SMALLINT, Integer, Date, delete
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_URL = 'postgresql://postgres:0053@localhost:5432/postgres'
engine = create_engine(DATABASE_URL)

class Base(DeclarativeBase): pass

class Doctor(Base):
    __tablename__ = 'Doctor'
    ID = Column(BIGINT, primary_key=True, index=True)
    Surname = Column(VARCHAR)
    Name = Column(VARCHAR)
    Middle_name = Column(VARCHAR)
    Phone_number = Column(VARCHAR)
    Section = Column(BIGINT)
    Experience = Column(Integer)

class Patient(Base):
    __tablename__ = 'Patient'
    ID = Column(BIGINT, primary_key=True, index=True)
    Surname = Column(VARCHAR)
    Name = Column(VARCHAR)
    Middle_name = Column(VARCHAR)
    Phone_number = Column(VARCHAR)
    Address = Column(VARCHAR)
    Age = Column(Integer)
    ID_sex = Column(BIGINT)

class Section(Base):
    __tablename__ = 'Section'
    ID = Column(BIGINT, primary_key=True, index=True)
    ID_patient = Column(BIGINT)
    Number = Column(Integer)

class Sex(Base):
    __tablename__ = 'Sex'
    ID = Column(BIGINT, primary_key=True, index=True)
    Name = Column(VARCHAR)

class Inspection(Base):
    __tablename__ = 'Inspection'
    ID = Column(BIGINT, primary_key=True, index=True)
    ID_place = Column(BIGINT)
    Date = Column(Date)
    ID_doctor = Column(BIGINT)
    ID_patient = Column(BIGINT)
    ID_symptoms = Column(BIGINT)
    ID_diagnosis = Column(BIGINT)
    Prescription = Column(VARCHAR)

class Place(Base):
    __tablename__ = 'Place'
    ID = Column(BIGINT, primary_key=True, index=True)
    Name = Column(VARCHAR)

class Symptoms(Base):
    __tablename__ = 'Symptoms'
    ID = Column(BIGINT, primary_key=True, index=True)
    Name = Column(VARCHAR)

class Diagnosis(Base):
    __tablename__ = 'Diagnosis'
    ID = Column(BIGINT, primary_key=True, index=True)
    Name = Column(VARCHAR)

SessionLocal = sessionmaker(autoflush=False, bind=engine)
db = SessionLocal()