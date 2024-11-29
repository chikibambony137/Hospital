import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPatient from './AddPatient';
import PatientExams from './PatientExams';
import PatientInfo from './PatientInfo';

const PatientsList = ({ doctorId, onBack }) => {

    const [Surname, setSurname] = useState()
    const [Name, setName] = useState()
    const [Middle_name, setMiddle_name] = useState()
    const [showExams, setShowExams] = useState(null);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showPatients, setShowPatients] = useState(false);

    useEffect(() => {
        const searchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/patients');
                setPatients(response.data);
            } catch (error) {
                alert(error);
            }
        };
        searchPatients();
    }, []);

    return (
        <div className="patient-list">
            <h2>Список пациентов</h2>

            <input 
                type="text" 
                placeholder="Фамилия" 
                value={Surname} 
                onChange={(e) => setSurname(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Имя" 
                value={Name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Отчество" 
                value={Middle_name} 
                onChange={(e) => setMiddle_name(e.target.value)} 
            />
            <br/>
            {<button className="btn">Найти</button>}
            <button className="btn" onClick={onBack}>Назад</button>
            <button className="btn">Добавить пациента</button>
            <br/>
            
            <div className="patient-list2">
            <ul>
                {patients.map((patient) => (
                    <li key={patient.ID} onClick={() => setSelectedPatient(patient)}>
                        {patient.Surname} {patient.Name} {patient.Middle_name}
                    </li>
                ))}
            </ul>
            </div>
            <div className="patient-selected">
                
                    {selectedPatient && (
                        <PatientInfo patient={selectedPatient} onShowPatients={() => setShowPatients(true)} />
                    )}

                {showPatients && selectedPatient && (
                    <PatientsList doctorId={selectedPatient.id} onBack={() => setShowPatients(false)} />
                )} 

                {/* <AddPatient doctorId={doctorId} onPatientAdded={fetchPatients} /> */}
                {showExams && (
                    <PatientExams patientId={showExams.id} onBack={() => setShowExams(null)} />
                )}
            </div>
        </div>
);
};

export default PatientsList;