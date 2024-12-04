from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError
from datetime import date, datetime
import re
from enum import Enum

class Sex(BaseModel):
    ID: int
    Name: str
    
class Doctor(BaseModel):
    ID: int
    Surname: str
    Name: str
    Middle_name: str
    Phone_number: str
    ID_section: int
    Experience: str

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

class Section(BaseModel):
    ID: int
    ID_patient: int
    Number: int



class Inspection(BaseModel):
    ID: int
    ID_place: int
    Date: date
    ID_doctor: int
    ID_patient: int
    ID_symptoms: int
    ID_diagnosis: int
    Prescription: str

class Place(BaseModel):
    ID: int
    Name: str

class Symptoms(BaseModel):
    ID: int
    Name: str

class Diagnosis(BaseModel):
    ID: int
    Name: str


class PatientAdd(BaseModel):
    Surname: str = Field(default='Иванов', min_length=1, max_length=50, description="Фамилия пациента, от 1 до 50 символов")
    Name: str = Field(default='Иван', min_length=1, max_length=50, description="Имя пациента, от 1 до 50 символов")
    Middle_name: str = Field(default='Иванович', min_length=1, max_length=50, description="Отчество пациента, от 1 до 50 символов, необязательно")
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
    
class InspectionAdd(BaseModel):
    Date: date = Field(default="2000-01-01", description="Дата осмотра")
    ID_place: int = Field(default=1, ge=1, description="ID места осмотра")
    ID_doctor: int = Field(default=1, ge=1, description="ID врача")
    ID_patient: int = Field(default=1, ge=1, description="ID пациента")
    ID_symptoms: int = Field(default=1, ge=1, description="ID симптома")
    ID_diagnosis: int = Field(default=1, ge=1, description="ID диагноза")
    Prescription: str = Field(default="...", min_length=1, max_length=300, description="Предписания пациенту")