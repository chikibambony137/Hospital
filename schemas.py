from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError
from datetime import date, datetime
import re
from enum import Enum
from fastapi import HTTPException

# Класс для представления пола пациента
class Sex(BaseModel):
    ID: int
    Name: str

# Класс для представления врача
class Doctor(BaseModel):
    ID: int
    Surname: str
    Name: str
    Middle_name: str
    Phone_number: str
    ID_section: int
    Experience: str

# Класс для представления пациента
class Patient(BaseModel):
    ID: int
    Surname: str
    Name: str
    Middle_name: str
    Phone_number: str
    Address: str
    Age: int
    ID_sex: int

    Sex: Sex

    class Config:
        orm_mode = True

# Класс для представления раздела
class Section(BaseModel):
    ID: int
    ID_patient: int
    Number: int

# Класс для представления осмотра
class Inspection(BaseModel):
    ID: int
    ID_place: int
    Date: date
    ID_doctor: int
    ID_patient: int
    ID_symptoms: int
    ID_diagnosis: int
    Prescription: str

# Класс для представления местоположения осмотра
class Place(BaseModel):
    ID: int
    Name: str

# Класс для представления симптомов
class Symptoms(BaseModel):
    ID: int
    Name: str

# Класс для представления диагноза
class Diagnosis(BaseModel):
    ID: int
    Name: str

# Класс для добавления нового пациента
class PatientAdd(BaseModel):
    Surname: str = Field(default='Иванов', min_length=1, max_length=50, description="Фамилия пациента, от 1 до 50 символов")
    Name: str = Field(default='Иван', min_length=1, max_length=50, description="Имя пациента, от 1 до 50 символов")
    Middle_name: str = Field(min_length=1, max_length=50, description="Отчество пациента, от 1 до 50 символов, необязательно")
    Phone_number: str = Field(default='+77777777777', description="Номер телефона в международном формате, начинающийся с '+'")
    Address: str = Field(default='г. Москва, ул. Пушкина, 15, кв. 52', min_length=5, max_length=200, description="Адрес пациента, не более 200 символов")
    Age: int = Field(default=0, ge=0, le=120, description="Возраст пациента ()")
    ID_sex: int = Field(default=..., ge=1, le=2, description="Пол пациента")

    @field_validator("Phone_number")
    @classmethod
    def validate_phone_number(cls, values: str) -> str:
        if not re.match(r'^\+\d{1,15}$', values):
            raise ValueError('Номер телефона должен начинаться с "+" и содержать от 1 до 15 цифр')
        return values

# Класс для добавления нового врача
class DoctorAdd(BaseModel):
    Surname: str = Field(default=..., min_length=1, max_length=50, description="Фамилия врача, от 1 до 50 символов")
    Name: str = Field(default=..., min_length=1, max_length=50, description="Имя врача, от 1 до 50 символов")
    Middle_name: str = Field(min_length=1, max_length=50, description="Отчество врача, от 1 до 50 символов, необязательно")
    Phone_number: str = Field(default=..., description="Номер телефона в международном формате, начинающийся с '+'")
    ID_section: int = Field(default=1, ge=1, le=10, description="Участок врача")
    Experience: int = Field(default=1, ge=1, le=100, description="Стаж врача")

    @field_validator("Phone_number")
    @classmethod
    def validate_phone_number(cls, values: str) -> str:
        if not re.match(r'^\+\d{1,15}$', values):
            raise ValueError('Номер телефона должен начинаться с "+" и содержать от 1 до 15 цифр')
        return values

# Класс для добавления новой записи осмотра
class InspectionAdd(BaseModel):
    Date: date = Field(default="2000-01-01", description="Дата осмотра")
    ID_place: int = Field(default=1, ge=1, description="ID места осмотра")
    ID_doctor: int = Field(default=1, ge=1, description="ID врача")
    ID_patient: int = Field(default=1, ge=1, description="ID пациента")
    ID_symptoms: int = Field(default=1, ge=1, description="ID симптома")
    ID_diagnosis: int = Field(default=1, ge=1, description="ID диагноза")
    Prescription: str = Field(default="...", min_length=1, max_length=300, description="Предписания пациенту")

def register_check(username: str, password: str, users: dict):
    """
    Функция для проверки вводимых данных для регистрации пользователя.

    Аргументы:
    username (str): имя пользователя.
    password (str): пароль пользователя.
    users (dict): список уже зарегистрированных пользователей.

    Возвращаемое значение:
    True, если вводные данные прошли все проверки.
    """
    
    # Убираем лишние пробелы
    username = username.strip()  
    password = password.strip()

    # Проверка на пустой логин
    if not username:
        raise HTTPException(status_code=400, detail="Логин не может быть пустым!")
    
    # Проверка на пустой пароль
    if not password:
        raise HTTPException(status_code=400, detail="Пароль не может быть пустым!")

    if len(username) < 5:
        raise HTTPException(status_code=400, detail="Логин должен иметь минимум 5 символов!")
    
    if len(password) < 5:
        raise HTTPException(status_code=400, detail="Пароль должен иметь минимум 5 символов!")
    
    LOGIN_REGEX = r'^[\wа-яА-Я][\wа-яА-Я._-]{4,}$'
    if not re.match(LOGIN_REGEX, username):
        raise HTTPException(
            status_code=400,
            detail="Логин должен начинаться с буквы и иметь только буквы, цифры, подчеркивания, точки или тире."
        )

    # Проверка на наличие пользователя
    for id in users:
        if username == users[id]:
            raise HTTPException(status_code=409, detail='Данный пользователь уже зарегистрирован!')
        
    return True