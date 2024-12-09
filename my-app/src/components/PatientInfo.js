import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const PatientInfo = ({ patient, onShowPatients }) => {
   
    //Объявление константы для перехода на страницу осмотров
    const navigate = useNavigate();
    const handle = async () => { 
            navigate('/inspections', { state: { patientId: patient.ID } }); 
    }; 
   
    //Отображение информации о пациентах
    return (
        <div className="patient-info">
            <h3>Информация о пациенте №{patient.ID}</h3>
            <p><strong>ФИО:</strong> {patient.Surname} {patient.Name} {patient.Middle_name}</p>
            <p><strong>Телефон:</strong> {patient.Phone_number}</p>
            <p><strong>Адрес:</strong> {patient.Address}</p>
            <p><strong>Возраст:</strong> {patient.Age}</p>
            <p><strong>Пол:</strong> {patient.Sex}</p>
            <button className="btn" onClick={handle} >Список осмотров</button>
        </div>
    );
};

export default PatientInfo;
