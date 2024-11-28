import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPatient from './AddPatient';
import PatientExams from './PatientExams';

const PatientsList = ({ doctorId, onBack }) => {
    const [patients, setPatients] = useState([]);
    const [showExams, setShowExams] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:8000/patients'+ doctorId);
            setPatients(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [doctorId]);

    const filteredPatients = patients.filter(patient =>
        patient.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="patients-list">
            <h2>Список пациентов</h2>
            <input 
                type="text" 
                placeholder="Поиск по ФИО" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <ul>
                {filteredPatients.map((patient) => (
                    <li key={patient.id}>
                        {patient.fullName}, {patient.age} лет
                        <button className="btn" onClick={() => setShowExams(patient)}>Показать осмотры</button>
                    </li>
                ))}
            </ul>
            <button className="btn" >Найти</button>
            <button className="btn" onClick={onBack}>Назад</button>
            <AddPatient doctorId={doctorId} onPatientAdded={fetchPatients} />
            {showExams && (
                <PatientExams patientId={showExams.id} onBack={() => setShowExams(null)} />
            )}
        </div>
    );
};

export default PatientsList;