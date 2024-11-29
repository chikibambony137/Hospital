import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const PatientInfo = ({ patient, onShowPatients }) => {
    const navigate = useNavigate();
    const handle = async () => { 
            navigate('/inspections'); 
    }; 
    return (
        <div className="patient-info">
            <h3>Информация о пациенте</h3>
            <p><strong>ФИО:</strong> {patient.Surname} {patient.Name} {patient.Middle_name}</p>
            <p><strong>Телефон:</strong> {patient.Phone_number}</p>
            <p><strong>Адрес:</strong> {patient.Address}</p>
            <p><strong>Возраст:</strong> {patient.Age}</p>
            <p><strong>Пол:</strong> {patient.ID_sex}</p>
            <button className="btn" onClick={handle} >Список осмотров</button>
        </div>
    );
};

export default PatientInfo;
