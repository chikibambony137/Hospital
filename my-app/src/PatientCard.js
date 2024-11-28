// PatientCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PatientCard = () => {
    const [patientId, setPatientId] = useState('');
    const [patient, setPatient] = useState(null);
    const [message, setMessage] = useState('');

    // Загрузка данных пациента по ID
    const fetchPatient = async () => {
        if (!patientId) return;

        try {
            const response = await axios.get('http://127.0.0.1:8000/patients/' + patientId);
            setPatient(response.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching patient data:', error);
            setMessage('Patient not found or error fetching data.');
            setPatient(null);
        }
    };

    const handleInputChange = (e) => {
        setPatientId(e.target.value);
    };

    const handleFetchClick = () => {
        fetchPatient();
    };

    return (
        <div>
            <h2>Patient Card</h2>
            <input
                type="text"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={handleInputChange}
            />
            <button onClick={handleFetchClick}>Fetch Patient</button>

            {message && <p>{message}</p>}

            {patient && (
                <div>
                    <h3>Details:</h3>
                    <p><strong>Name:</strong> {patient.Name}</p>
                    <p><strong>Age:</strong> {patient.Age}</p>
                </div>
            )}
                 <Link to="/">Back to Home</Link>
        </div>
    );
};

export default PatientCard;