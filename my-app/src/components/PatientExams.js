import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddExam from './AddExam';
import { useLocation } from 'react-router-dom';

const PatientExams = () => {
    const [inspections, setInspections] = useState([]);
    const location = useLocation();
    const { patientId } = location.state || {};
  
    const fetchExams = async () => {
        try {
            const response = await axios.get('http://localhost:8000/inspections/' + patientId);
            setInspections(response.data);
        } catch (error) {
            alert('Error: ' + patientId);
        }
    };

    useEffect(() => {
        fetchExams();
    }, [patientId]);

    return (
        <div className="patient-list">
            <h2>Осмотры пациента</h2>
            <ul>
                {inspections.map((inspection) => (
                    <li key={inspection.id}>
                        Осмотр №{inspection.ID}, Дата осмотра: {inspection.Date}, Место: {inspection.Place} <br/>
                        Врач: {inspection.Doctor}, Пациент: {inspection.Patient} <br/>
                        Симптомы: {inspection.Symptoms} <br/>
                        Диагноз: {inspection.Diagnosis} <br/>
                        Предписание: {inspection.Prescription}
                    </li>
                ))}
            </ul>
            <div className="patient-selected">
            <ul>
                <AddExam patientId={patientId} onExamAdded={fetchExams} />
            </ul>
            </div>
            <button className="btn" >Назад</button>
        </div>
        
    );
};

export default PatientExams;
