import React, { useState } from 'react';
import axios from 'axios';

const AddPatient = ({ doctorId, onPatientAdded }) => {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/patients', { fullName, address, age, gender, phone, doctorId });
            onPatientAdded();
            // Reset form fields after submission
            setFullName('');
            setAddress('');
            setAge('');
            setGender('');
            setPhone('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-patient-form">
            <h3>Добавить пациента</h3>
            <input type="text" placeholder="ФИО" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <input type="text" placeholder="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <input type="number" placeholder="Возраст" value={age} onChange={(e) => setAge(e.target.value)} required />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Выберите пол</option>
                <option value="М">Мужской</option>
                <option value="Ж">Женский</option>
            </select>
            <input type="text" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <button type="submit" className="btn">Добавить</button>
        </form>
    );
};

export default AddPatient;
