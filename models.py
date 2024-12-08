from sqlalchemy import create_engine, Column, BIGINT, VARCHAR, SMALLINT, Integer, Date, ForeignKey, String, desc
from database import Base
from passlib.context import CryptContext

# Создание контекста для хеширования паролей с использованием схемы bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Класс, представляющий таблицу "Doctor" в базе данных
class Doctor(Base):
    __tablename__ = 'Doctor'
    ID = Column(BIGINT, primary_key=True, index=True)

    Surname = Column(VARCHAR)
    Name = Column(VARCHAR)
    Middle_name = Column(VARCHAR)

    Phone_number = Column(VARCHAR)
    ID_section = Column(BIGINT)
    Experience = Column(Integer)

# Класс, представляющий таблицу "Patient" в базе данных
class Patient(Base):
    __tablename__ = 'Patient'
    ID = Column(BIGINT, primary_key=True, index=True)

    Surname = Column(VARCHAR)
    Name = Column(VARCHAR)
    Middle_name = Column(VARCHAR)

    Phone_number = Column(VARCHAR)
    Address = Column(VARCHAR)
    Age = Column(Integer)
    ID_sex = Column(BIGINT, ForeignKey("Sex.ID"))

# Класс, представляющий таблицу "Section" в базе данных
class Section(Base):
    __tablename__ = 'Section'

    ID = Column(BIGINT, primary_key=True, index=True)
    ID_patient = Column(BIGINT)
    Number = Column(Integer)

# Класс, представляющий таблицу "Sex" в базе данных
class Sex(Base):
    __tablename__ = 'Sex'
    ID = Column(BIGINT, primary_key=True, index=True)

    # Название пола ("Мужской", "Женский")
    Name = Column(VARCHAR)

# Класс, представляющий таблицу "Inspection" в базе данных
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

# Класс, представляющий таблицу "Place" в базе данных
class Place(Base):
    __tablename__ = 'Place'
    ID = Column(BIGINT, primary_key=True, index=True)
    Name = Column(VARCHAR)

# Класс, представляющий таблицу "Symptoms" в базе данных
class Symptoms(Base):
    __tablename__ = 'Symptoms'
    ID = Column(BIGINT, primary_key=True, index=True)
    Name = Column(VARCHAR)

# Класс, представляющий таблицу "Diagnosis" в базе данных
class Diagnosis(Base):
    __tablename__ = 'Diagnosis'
    ID = Column(BIGINT, primary_key=True, index=True)
    Name = Column(VARCHAR)

# Класс, представляющий таблицу "User" в базе данных
class User(Base):
    __tablename__ = 'Users'
    ID = Column(BIGINT, primary_key=True, index=True)
    Username = Column(VARCHAR, unique=True)

    # Роль пользователя ("admin", "patient", "doctor")
    Role = Column(VARCHAR)

    # Хэшированный пароль пользователя
    Hashed_password = Column(VARCHAR)

    # Метод для установки пароля пользователя
    def set_password(self, password: str):
        # Хеширование пароля перед сохранением
        self.Hashed_password = pwd_context.hash(password)

    # Метод для установки роли пользователя
    def set_role(self, role: str):
        self.Role = role

    # Метод для проверки введенного пользователем пароля
    def verify_password(self, password: str):
        # Проверка совпадения хеша пароля
        return pwd_context.verify(password, self.Hashed_password)