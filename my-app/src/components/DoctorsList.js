import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorInfo from './DoctorInfo';
import PatientsList from './PatientsList';

const DoctorsList = ({ user }) => {                                    
    
    //Объявление констант для данных о врачах
    const [Surname, setSurname] = useState('');
    const [Name, setName] = useState('');
    const [Middle_name, setMiddle_Name] = useState('');
    
    //Объявление констант для выборки, сортировки и отображения данных                                                                  
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showPatients, setShowPatients] = useState(false);
    
    //Объявление констант для загрузки и отображения ошибок
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    //Объявление константы для перехода на предыдущую страницу
    const handleBack = () => {
        window.history.back();
    };
    
    //Обращение к базе данных через FastAPI для вывода списка врачей
    useEffect(() => {
        const searchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/doctors', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setDoctors(response.data);
                setFilteredDoctors(response.data);
                setLoading(false);
            } catch (error) { 
                setError('Не удалось загрузить врачей');
                setLoading(false);
                console.error(error);
            }
        };
        searchDoctors();
    }, []);
    
    //Объявление константы для поиска врачей из списка
    const handleSearch = () => {
        const filtered = doctors.filter(doctor => 
            doctor.Surname.toLowerCase().includes(Surname.toLowerCase()) &&
            doctor.Name.toLowerCase().includes(Name.toLowerCase()) &&
            doctor.Middle_name.toLowerCase().includes(Middle_name.toLowerCase())
        );
        setFilteredDoctors(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [Surname, Name, Middle_name, doctors]);
    
    //Объявление формы для поиска врачей из списка
    return (
        <div className="patient-list">
            <h2>Поиск</h2>
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

            <button className="btn" onClick={handleBack}>Назад</button>
            
            {/* Отображение списка врачей */}
            <h2>Список врачей</h2>
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <ul>
                    {filteredDoctors.map((doctor) => (
                        <li key={doctor.ID} onClick={() => setSelectedDoctor(doctor)}>
                            {doctor.Surname} {doctor.Name} {doctor.Middle_name}

                            </li>
                    ))}
                </ul>
            )}
            
            {/* Окно для отображения информации о враче */}
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
