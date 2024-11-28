// UpdatePatient.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePatient = ({ patientId }) => {
    const [patient, setPatient] = useState({ Surname: '', Name: '', Middle_name: '', Phone_number: '', Address: '', Age: '', ID_sex: '' });
    const [message, setMessage] = useState('');

    // Загрузка данных пациента по ID
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/patients/{patientId}');
                setPatient(response.data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setMessage('Error fetching patient data.');
            }
        };

        fetchPatient();
    }, [patientId]);

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://127.0.0.1:8000/patients/{patientId}', patient);
            setMessage('Patient updated successfully!');
        } catch (error) {
            console.error('Error updating patient:', error);
            setMessage('Failed to update patient.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));
    };

    return (
        <div>
            <h2>Update Patient</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="Name"
                        value={patient.Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="Age"
                        value={patient.Age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Update Patient</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdatePatient;
