import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorInfo from './DoctorInfo';
import PatientsList from './PatientsList';

const DoctorsList = ({ user }) => {
    const [Surname, setSurname] = useState('');
    const [Name, setName] = useState('');
    const [Middle_name, setMiddle_Name] = useState('');

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showPatients, setShowPatients] = useState(false);
    const handleBack = () => {window.history.back();}

    useEffect(() => {
        const searchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        searchDoctors();
    }, []); 

    const handleSearch = () => {
        return doctors.filter(doctor => 
            doctor.Surname.toLowerCase().includes(Surname.toLowerCase()) &&
            doctor.Name.toLowerCase().includes(Name.toLowerCase()) &&
            doctor.Middle_name.toLowerCase().includes(Middle_name.toLowerCase())
        );
    };

    const filteredDoctors = handleSearch();

    return (
       
        <div className="patient-list">
 
            <h2>Список врачей</h2>
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
            <button className="bth-doctor_list" onClick={handleBack}>🠔</button>
            <ul>
                {filteredDoctors.map((doctor) => (
                    <li key={doctor.ID} onClick={() => setSelectedDoctor(doctor)}>
                        {doctor.Surname} {doctor.Name} {doctor.Middle_name}
                    </li>
                ))}
            </ul>
            <div className="patient-selected">
            {selectedDoctor && (
                <DoctorInfo doctor={selectedDoctor} onShowPatients={() => setShowPatients(true)} />
            )}
            {showPatients && selectedDoctor && (
                <PatientsList doctorId={selectedDoctor.id} onBack={() => setShowPatients(false)} />
            )}
            </div>
        </div>
        );
    };
    
    export default DoctorsList;
    