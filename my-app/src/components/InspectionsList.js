import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddInspection from './AddInspection';
import { useLocation } from 'react-router-dom';

const PatientInspections = () => {
    const [inspections, setInspections] = useState([]);
    const [expandedInspectionIds, setExpandedInspectionIds] = useState([]); // Массив для хранения раскрытых осмотров
    const location = useLocation();
    const { patientId } = location.state || {};
    const handleBack = () => { window.history.back(); }

    const fetchInspections = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/inspections/${patientId}`);
            setInspections(response.data);
        } catch (error) {
            alert('Ошибка! ' + error);
        }
    };

    useEffect(() => {
        fetchInspections();
    }, [patientId]);

    const handleToggleDescription = (id) => {
        if (expandedInspectionIds.includes(id)) {
            // Если осмотр уже раскрыт, то удаляем его из списка раскрытых
            setExpandedInspectionIds(expandedInspectionIds.filter(i => i !== id));
        } else {
            // Иначе добавляем его в список раскрытых
            setExpandedInspectionIds([...expandedInspectionIds, id]);
        }
    };

    return (
        <div className="patient-list">
            <h2>Осмотры пациента №{patientId}</h2>
            <button className="btn" onClick={handleBack}>Назад</button>
            <ul>
                {inspections.map((inspection) => (
                    <li key={inspection.ID}>
                        <div className='inspection-list' onClick={() => handleToggleDescription(inspection.ID)} style={{ cursor: 'pointer' }}>
                            ID: {inspection.ID}, Дата осмотра: {inspection.Date}, Место: {inspection.Place} <br/>
                            Врач: {inspection.Doctor_surname} {inspection.Doctor_name} {inspection.Doctor_middle_name}
                            <br/>
                            Пациент: {inspection.Patient_surname} {inspection.Patient_name} {inspection.Patient_middle_name}
                            <br/>
                            {expandedInspectionIds.includes(inspection.ID) && (
                                <>
                                    Симптомы: {inspection.Symptoms} <br/>
                                    Диагноз: {inspection.Diagnosis} <br/>
                                    Предписание: {inspection.Prescription}
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <AddInspection patientId={patientId} onExamAdded={fetchInspections} />
            </div>
        </div>
    );
};

export default PatientInspections;