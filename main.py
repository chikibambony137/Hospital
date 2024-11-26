from fastapi import FastAPI
import sql
from sql import *
import pydant

app = FastAPI()

@app.get("/")
async def root():
    return {"ti": "ABOBA"}

@app.get("/patients")
async def get_patients():
    return sql.db.query(Patient).all()

@app.post("/patients/add", response_model=pydant.PatientAdd)
async def add_patient(patient: pydant.PatientAdd):
    new_patient = Patient(Surname = patient.Surname,
                          Name = patient.Name,
                          Middle_name = patient.Middle_name,
                          Phone_number = patient.Phone_number,
                          Address = patient.Address,
                          Age = patient.Age,
                          ID_sex = patient.ID_sex)
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    print(new_patient.ID)
    return new_patient

@app.delete('/patients/delete')
async def remove_patient(ID_patient: int):
    deleted_patient =  sql.db.query(Patient).filter(Patient.ID == ID_patient)
    deleted_patient.delete()
    db.commit()
    return deleted_patient

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # или любой ваш домен
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


