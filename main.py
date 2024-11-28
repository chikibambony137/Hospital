from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from models import Base, Patient, Doctor, User
from database import *
import schemas

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"ti": "ABOBA"}

@app.get("/patients")
async def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()
    # return db.query(Patient).join(Patient.ID_sex)

@app.post("/patients/add", response_model=schemas.PatientAdd)
async def add_patient(patient: schemas.PatientAdd, db: Session = Depends(get_db)):
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
    return new_patient

@app.delete('/patients/delete')
async def remove_patient(ID_patient: int, db: Session = Depends(get_db)):
    deleted_patient =  db.query(Patient).filter(Patient.ID == ID_patient).delete()
    db.commit()
    return deleted_patient

@app.get("/patients/{patient_id}")
async def get_patient(patient_id: int, db: Session = Depends(get_db)):
    return db.query(Patient).filter(Patient.ID == patient_id).first()

@app.get("/doctors")
async def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()

@app.post("/doctors/add", response_model=schemas.DoctorAdd)
async def add_doctor(doctor: schemas.DoctorAdd, db: Session = Depends(get_db)):
    new_doctor = Doctor(Surname = doctor.Surname,
                        Name = doctor.Name,
                        Middle_name = doctor.Middle_name,
                        Phone_number = doctor.Phone_number,
                        Experience = doctor.Experience,
                        ID_section = doctor.ID_section)
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    print(new_doctor.ID)
    return new_doctor

@app.delete('/doctors/delete')
async def remove_doctor(ID_doctor: int, db: Session = Depends(get_db)):
    deleted_doctor =  db.query(Doctor).filter(Doctor.ID == ID_doctor).delete()
    db.commit()
    return deleted_doctor

@app.get("/doctors/{doctor_id}")
async def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.ID == doctor_id).first()
    if doctor == None:
        raise HTTPException(status_code=404, detail='Doctor not found')
    




@app.get('/users')
async def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@app.post("/login/")
async def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.Username == user.Username).first()
    
    if (db_user.Password != user.Password):  # Проверка пароля
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    return {"message": "Login successful", "user_id": "", "success": True}