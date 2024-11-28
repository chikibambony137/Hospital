import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorInfo from './DoctorInfo';
import PatientsList from './PatientsList';

const DoctorsList = ({ user }) => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showPatients, setShowPatients] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className="doctors-list">
            <h2>Список врачей</h2>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.ID} onClick={() => setSelectedDoctor(doctor)}>
                        {doctor.Surname} {doctor.Name} {doctor.Middle_name}

                    </li>
                ))}
            </ul>
            {selectedDoctor && (
                <DoctorInfo doctor={selectedDoctor} onShowPatients={() => setShowPatients(true)} />
            )}
            {showPatients && selectedDoctor && (
                <PatientsList doctorId={selectedDoctor.id} onBack={() => setShowPatients(false)} />
            )}        
        </div>
        );
    };
    
    export default DoctorsList;
    