import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddExam from './AddExam';

const PatientExams = ({ patientId, onBack }) => {
    const [exams, setExams] = useState([]);

  
    const fetchExams = async () => {
        try {
            const response = await axios.get('http://localhost:8000/' + patientId);
            setExams(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchExams();
    }, [patientId]);

    return (
        <div className="patient-exams">
            <h2>Осмотры пациента</h2>
            <AddExam patientId={patientId} onExamAdded={fetchExams} />
            <ul>
                {exams.map((exam) => (
                    <li key={exam.id}>
                        Осмотр №{exam.id}, Дата: {exam.date}, Место: {exam.location}, Врач: {exam.doctor}, Симптомы: {exam.symptoms}, Диагноз: {exam.diagnosis}, Предписание: {exam.prescription}
                    </li>
                ))}
            </ul>
            <button className="btn" onClick={onBack}>Назад</button>
        </div>
    );
};

export default PatientExams;
