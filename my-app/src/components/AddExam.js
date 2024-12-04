import React, { useState } from 'react';
import axios from 'axios';

const AddExam = ({ patientId, onExamAdded }) => {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [doctor, setDoctor] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [prescription, setPrescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/exams', { date, location, doctor, symptoms, diagnosis, prescription, patientId });
            onExamAdded();
            // Reset form fields after submission
            setDate('');
            setLocation('');
            setDoctor('');
            setSymptoms('');
            setDiagnosis('');
            setPrescription('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-exam-form">
            <h3>Добавить осмотр</h3>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="text" placeholder="Место осмотра" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="text" placeholder="Врач" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
            <input type="text" placeholder="Симптомы" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required/>
            <input type="text" placeholder="Диагноз" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required/>
            <input type="text" placeholder="Предписание" value={prescription} onChange={(e) => setPrescription(e.target.value)} required/>
            <button type="submit" className="btn">Добавить</button>
        </form>
    );
};

export default AddExam;
