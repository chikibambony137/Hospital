import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddInspection = ({ patientId }) => {
    
    //Объявление констант данных о осмотре
    const [Date, setDate] = useState('');
    const [ID_place, setPlace] = useState('');
    const [ID_doctor, setDoctor] = useState('');
    const [ID_patient, setPatient] = useState('');
    const [ID_symptoms, setSymptoms] = useState('');
    const [ID_diagnosis, setDiagnosis] = useState('');
    const [Prescription, setPrescription] = useState('');
    
    //Объявление констант списков врачей, симптомов и диагнозов
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [symptomOptions, setSymptomOptions] = useState([]);
    const [diagnosisOptions, setDiagnosisOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                //Отправка запроса к базе данных через FastAPI для получения списка симптомов
                const symptomsResponse = await axios.get('http://localhost:8000/symptoms', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setSymptomOptions(symptomsResponse.data);

                //Отправка запроса к базе данных через FastAPI для получения списка диагнозов
                const diagnosesResponse = await axios.get('http://localhost:8000/diagnosis', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setDiagnosisOptions(diagnosesResponse.data);

                //Отправка запроса к базе данных через FastAPI для получения списка врачей
                const doctorResponse = await axios.get('http://localhost:8000/doctors', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setDoctorOptions(doctorResponse.data);

                //Устанавливаем id пациента
                setPatient(patientId);
            } catch (error) {
                alert("Ошибка при загрузке данных: ", error);
            }
        };
        fetchData();
    }, []);

    //Отправка запроса к базе данных через FastAPI для добавления осмотра
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/inspections/add', { Date, ID_place, ID_doctor, ID_patient,
                                            ID_symptoms, ID_diagnosis, Prescription }, {
                                                headers: {
                                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                                },
                                            });
            // Сбросить поля формы после отправки
            setDate('');
            setPlace('');
            setDoctor('');
            setSymptoms('');
            setDiagnosis('');
            setPrescription('');
            window.location.reload()
        } catch (error) {
            alert('Ошибка! Неверно введенные данные!')
        }
    };

    //Отображение формы для добавления осмотра пациента
    return (
        <div className="inspection-add-form">
            <h3>Добавить осмотр</h3>
            <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} required />

            <select type="number" value={ID_place} onChange={(e) => setPlace(e.target.value)} required>
                <option value="">Выберите место осмотра</option>
                <option value="1">На дому</option>
                <option value="2">Поликлиника</option>
            </select>

            <select value={ID_doctor} onChange={(e) => setDoctor(e.target.value)} required>
                <option value="">Выберите врача</option>
                {doctorOptions.map((doctor) => (
                    <option key={doctor.ID} value={doctor.ID}>{doctor.Surname} {doctor.Name} {doctor.Middle_name}</option>
                ))}
            </select>

            <select value={ID_symptoms} onChange={(e) => setSymptoms(e.target.value)} required>
                <option value="">Выберите симптомы</option>
                {symptomOptions.map((symptom) => (
                    <option key={symptom.ID} value={symptom.ID}>{symptom.Name} </option>
                ))}
            </select>

            <select value={ID_diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required>
                <option value="">Выберите диагноз</option>
                {diagnosisOptions.map((diagnos) => (
                    <option key={diagnos.ID} value={diagnos.ID}>{diagnos.Name}</option>
                ))}
            </select>

            <input type="text" placeholder="Предписание" value={Prescription} onChange={(e) => setPrescription(e.target.value)} required/>

            <button type="submit" onClick={handleSubmit} className="btn">Добавить</button>
        </div>
    );
};

export default AddInspection;
