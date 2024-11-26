from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError
from datetime import date, datetime
import re
from enum import Enum


class PatientAdd(BaseModel):
    Surname: str = Field(default=..., min_length=1, max_length=50, description="Фамилия пациента, от 1 до 50 символов")
    Name: str = Field(default=..., min_length=1, max_length=50, description="Имя пациента, от 1 до 50 символов")
    Middle_name: str = Field(min_length=1, max_length=50, description="Отчество пациента, от 1 до 50 символов, необязательно")
    Phone_number: str = Field(default=..., description="Номер телефона в международном формате, начинающийся с '+'")
    Address: str = Field(default=..., min_length=10, max_length=200, description="Адрес пациента, не более 200 символов")
    Age: int = Field(default=..., ge=0, le=120, description="Возраст пациента ()")
    ID_sex: int = Field(default=1, ge=1, le=2, description="Пол пациента")

    @field_validator("Phone_number")
    @classmethod
    def validate_phone_number(cls, values: str) -> str:
        if not re.match(r'^\+\d{1,15}$', values):
            raise ValueError('Номер телефона должен начинаться с "+" и содержать от 1 до 15 цифр')
        return values
    
