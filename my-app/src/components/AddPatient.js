import React, { useState } from 'react';
import axios from 'axios';

const AddPatient = () => {
    
    //Объявление констант для данных о пациенте
    const [Surname, setSurname] = useState('');
    const [Name, setName] = useState('');
    const [Middle_name, setMiddle_name] = useState('');
    const [Phone_number, setPhone_number] = useState('');
    const [Address, setAddress] = useState('');
    const [Age, setAge] = useState('');
    const [ID_sex, setSex] = useState('');
    
    //Объявление функции для перехода на предыдущую страницу
    const handleBack = () => {window.history.back();}

    //Отправка запроса к базе данных через FastAPI для добавления данных о пациенте
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/patients/add', { Surname, Name, Middle_name, Phone_number, Address, Age, ID_sex}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            //Сброс полей после добавления
            setSurname('');
            setName('');
            setMiddle_name('');
            setPhone_number('');
            setAddress('');
            setAge('');
            setSex(0);
            alert('Пациент успешно добавлен!')
        } catch (error) {
            alert("Ошибка! Неверно введенные данные!");
        }
    };

    //Отображение формы для добавления пациента
    return (
        <div className="patient-list">
            <h3>Добавить пациента</h3>
            <input type="text" placeholder="Фамилия" value={Surname} onChange={(e) => setSurname(e.target.value)} required />
            <input type="text" placeholder="Имя" value={Name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Отчество" value={Middle_name} onChange={(e) => setMiddle_name(e.target.value)} />
            <input type="text" placeholder="Телефон" value={Phone_number} onChange={(e) => setPhone_number(e.target.value)} required />
            <input type="text" placeholder="Адрес" value={Address} onChange={(e) => setAddress(e.target.value)} required />
            <input type="number" placeholder="Возраст" value={Age} onChange={(e) => setAge(e.target.value)} required />

            <select type="number" value={ID_sex} onChange={(e) => setSex(e.target.value)} required>
                <option value="">Выберите пол</option>
                <option value="1">Женский</option>
                <option value="2">Мужской</option>
            </select>

            <button type="submit" onClick={handleSubmit} className="btn">Добавить</button>
            <button className="btn" onClick={handleBack}>Назад</button>
            
        </div>
    );
};

export default AddPatient;
