import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddInspection from './AddInspection';
import { useLocation } from 'react-router-dom';

const PatientInspections = () => {
    const [inspections, setInspections] = useState([]);
    const [expandedInspectionId, setExpandedInspectionId] = useState(null); // Состояние для отслеживания раскрытого осмотра
    const location = useLocation();
    const { patientId } = location.state || {};
    const handleBack = () => {window.history.back();}

    const fetchExams = async () => {
        try {
            const response = await axios.get('http://localhost:8000/inspections/' + patientId);
            setInspections(response.data);
        } catch (error) {
            alert('Error: ' + error);
        }
    };

    useEffect(() => {
        fetchExams();
    }, [patientId]);

    const handleTogglePrescription = (id) => {
        // Если нажали на уже раскрытый элемент, закрываем его, иначе раскрываем новый
        setExpandedInspectionId(expandedInspectionId === id ? null : id);
    };

    return (
        <div className="patient-list">
            <h2>Осмотры пациента</h2>
            <ul>
                {inspections.map((inspection) => (
                    <li key={inspection.ID}>
                        <div className='inspection-list' onClick={() => handleTogglePrescription(inspection.ID)} style={{ cursor: 'pointer' }}>
                            ID: {inspection.ID}, Дата осмотра: {inspection.Date}, Место: {inspection.Place} <br/>
                            Врач: {inspection.Doctor}, Пациент: {inspection.Patient} <br/>
                            Симптомы: {inspection.Symptoms} <br/>
                            Диагноз: {inspection.Diagnosis} <br/>
                            Предписание: {expandedInspectionId === inspection.ID ? inspection.Prescription : `${inspection.Prescription.slice(0, 20)}`}
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <AddInspection patientId={patientId} onExamAdded={fetchExams} />
            </div>
            <button className="btn" onClick={handleBack}>Назад</button>
        </div>
    );
};

export default PatientInspections;
