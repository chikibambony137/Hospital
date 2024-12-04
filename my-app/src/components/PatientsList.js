import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientInfo from './PatientInfo';
import { useNavigate } from 'react-router-dom'; 

const PatientsList = () => {
    const [Surname, setSurname] = useState('');
    const [Name, setName] = useState('');
    const [Middle_name, setMiddle_Name] = useState('');
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState();
    const [showPatients, setShowPatients] = useState(false);
    const navigate = useNavigate();
    const handleBack = () => {window.history.back();}

    useEffect (() => {
        const searchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/patients');
                setPatients(response.data);
            } catch (error) {
                alert(error);
            }
        };
        searchPatients();
    }, []);

    const handleSearch = () => {
        return patients.filter(patient => 
            patient.Surname.toLowerCase().includes(Surname.toLowerCase()) &&
            patient.Name.toLowerCase().includes(Name.toLowerCase()) &&
            patient.Middle_name.toLowerCase().includes(Middle_name.toLowerCase())
        );
    };

    const handleAdd = () => {
        navigate('/patients/add')
    };

    const filteredPatients = handleSearch();

    return (
        <div className="patient-list">
            <h2>Список пациентов</h2>

            <input 
                type="text" 
                placeholder="Фамилия" 
                value={Surname} 
                onChange={(e) => setSurname(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Имя" 
                value={Name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Отчество" 
                value={Middle_name} 
                onChange={(e) => setMiddle_Name(e.target.value)} 
            />
            <br/>
            <button className="list" onClick={handleBack}>Назад</button>
            <button className="list" onClick={handleAdd}>Добавить</button>
            <br/>
            
            <div className="patient-list2">
                <ul>
                    {filteredPatients.map((patient) => (
                        <li key={patient.ID} onClick={() => setSelectedPatient(patient)}>
                            {patient.Surname} {patient.Name} {patient.Middle_name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="patient-selected">
                {selectedPatient && (
                    <PatientInfo patient={selectedPatient} onShowPatients={() => setShowPatients(true)} />
                )}
            </div>
        </div>
    );
};

export default PatientsList;
