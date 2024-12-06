from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware

from models import *
from database import *
import schemas

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt import create_access_token, verify_token

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/register")
async def register(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = User(Username=form_data.username)
    users = dict(db.query(User.ID, User.Username))
    
    schemas.register_check(form_data.username, form_data.password, users)
    user.set_password(form_data.password)
    db.add(user)
    db.commit()
    return {"msg": "Пользователь зарегистрирован!"} 

 

@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.Username == form_data.username).first()
    if not user or not user.verify_password(form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный логин или пароль!",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.Username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get('/users')
async def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"username": payload}

@app.get("/")
async def root():
    return {"ti": "ABOBA"}

@app.get("/patients")
async def get_patients(db: Session = Depends(get_db)):
    query = db.query(Patient, Sex.Name).join(Sex, Patient.ID_sex == Sex.ID).order_by(Patient.ID).all()
    patient_list = [
        {
            "ID": patient.ID,
            "Surname": patient.Surname,
            "Name": patient.Name,
            "Middle_name": patient.Middle_name,
            "Sex": sex_name,
            "Age": patient.Age,
            "Phone_number": patient.Phone_number,
            "Address": patient.Address
        }
        for patient, sex_name in query
    ]
    return patient_list

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
    return new_doctor

@app.delete('/doctors/delete')
async def remove_doctor(ID_doctor: int, db: Session = Depends(get_db)):
    deleted_doctor = db.query(Doctor).filter(Doctor.ID == ID_doctor).delete()
    db.commit()
    return deleted_doctor

@app.get("/doctors/{doctor_id}")
async def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.ID == doctor_id).first()
    if doctor == None:
        raise HTTPException(status_code=404, detail='Doctor not found')

@app.get('/diagnosis')
async def get_diagnosis(db: Session = Depends(get_db)):
    return db.query(Diagnosis).order_by(Diagnosis.Name).all()

@app.get('/symptoms') 
async def get_symptoms(db: Session = Depends(get_db)):
    return db.query(Symptoms).order_by(Symptoms.Name).all()

@app.get('/inspections/{patient_id}')
async def get_inspections(patient_id: int, db: Session = Depends(get_db)):
    query = db.query(Inspection, Place.Name, Doctor.Surname, Doctor.Name, Doctor.Middle_name,
                     Patient.Surname, Patient.Name, Patient.Middle_name, Diagnosis.Name, Symptoms.Name)
    query = query.join(Place, Inspection.ID_place == Place.ID)\
                .join(Doctor, Inspection.ID_doctor == Doctor.ID)\
                .join(Patient, Inspection.ID_patient == Patient.ID)\
                .join(Diagnosis, Inspection.ID_diagnosis == Diagnosis.ID)\
                .join(Symptoms, Inspection.ID_symptoms == Symptoms.ID)\
                .where(Inspection.ID_patient == patient_id).order_by(desc(Inspection.Date)).all()
    inspection_list = [
        {
            "ID": inspection.ID,
            "Place": place_name,
            "Date": inspection.Date,
            "Doctor_surname": doctor_surname,
            "Doctor_name": doctor_name,
            "Doctor_middle_name": doctor_middle_name,
            "Patient_surname": patient_surname,
            "Patient_name": patient_name,
            "Patient_middle_name": patient_middle_name,
            "Diagnosis": diagnosis_name,
            "Symptoms": symptoms_name,
            "Prescription": inspection.Prescription
        }
        for inspection, place_name, doctor_surname, doctor_name, doctor_middle_name,
        patient_surname, patient_name, patient_middle_name, diagnosis_name, symptoms_name in query
    ]
    return inspection_list

@app.post("/inspections/add", response_model=schemas.InspectionAdd)
async def add_inspection(inspection: schemas.InspectionAdd, db: Session = Depends(get_db)):
    new_inspection = Inspection(Date = inspection.Date,
                                ID_place = inspection.ID_place,
                                ID_doctor = inspection.ID_doctor,
                                ID_patient = inspection.ID_patient,
                                ID_symptoms = inspection.ID_symptoms,
                                ID_diagnosis = inspection.ID_diagnosis,
                                Prescription = inspection.Prescription)
    db.add(new_inspection)
    db.commit()
    db.refresh(new_inspection)
    return new_inspection

@app.get("/patients_search/{surname}")
async def search(surname: str, db: Session = Depends(get_db)):
    try:
        patients = db.query(Patient).filter(Patient.Surname == surname).all()
        return {"data": patients, "success": True}
    except:
        return {"data": "Error", "success": False}
   