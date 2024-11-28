import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientList.css'; // Импортируем стили

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPatient, setNewPatient] = useState({ Surname: '', Name: '', Middle_name: '', Phone_number: '', Address: '', Age: '', ID_sex: '' });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/patients');
        setPatients(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const addPatient = async () => {
    try {
      const response = await axios.post('http://localhost:8000/patients/add', newPatient);
      setPatients([...patients, response.data]);
      setNewPatient({ Surname: '', Name: '', Middle_name: '', Phone_number: '', Address: '', Age: '', ID_sex: ''}); // Сбросить форму
    } catch (err) {
      setError(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="patient-list-container">
      <h2>Список пациентов</h2>
      <ul className="patient-list">
        {patients.map(patient => (
          <li key={patient.ID} className="patient-item">
            {patient.Surname} {patient.Name} {patient.Middle_name} - {patient.Age} лет, телефон: {patient.Phone_number} <br/>
            Адрес: {patient.Address}, пол {patient.ID_sex} (1 - Женский, 2 - Мужской)
          </li>
        ))}
      </ul>
      <h2>Добавить пациента</h2>
      <input
        type="text"
        name="Surname"
        placeholder="Фамилия"
        value={newPatient.Surname}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Name"
        placeholder="Имя"
        value={newPatient.Name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Middle_name"
        placeholder="Отчество"
        value={newPatient.Middle_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Phone_number"
        placeholder="Телефон"
        value={newPatient.Phone_number}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Address"
        placeholder="Адрес"
        value={newPatient.Address}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Age"
        placeholder="Возраст"
        value={newPatient.age}
        onChange={handleChange}
      />
      <input
        type="number"
        name="ID_sex"
        placeholder="Пол"
        value={newPatient.ID_sex}
        onChange={handleChange}
      />
      <button onClick={addPatient}>Добавить пациента</button>
    </div>
  );
};

export default PatientList;