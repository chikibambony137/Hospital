import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Login = () => { 
    
    //Объявление констант для логина и пароля при входе и регистрации
    const [Username, setUsername] = useState(''); 
    const [Password, setPassword] = useState(''); 
    const [Username2, setUsername2] = useState(''); 
    const [Password2, setPassword2] = useState(''); 
    const [Role, setRole] = useState('');
    const [Role2, setRole2] = useState('');
    const navigate = useNavigate(); 

    //Отправка запроса к базе данных через FastAPI и Axios для авторизации
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/login', new URLSearchParams({
                username: Username,
                password: Password,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Сохраняем токен в localStorage
            localStorage.setItem('token', response.data.access_token);
            setRole(response.data.role);
            localStorage.setItem('role', response.data.role);
        } catch (error) {
            alert('Ошибка! ' + (error.response?.data?.detail || ''));
        }
    };

    // Эффект для отслеживания изменений роли
    useEffect(() => {
        if (Role !== null) {
            if (Role === 'admin' || Role === 'doctor') {
                navigate('/doctors');
            } else if (Role === 'patient') {
                navigate('/patients');
            }
        }
    }, [Role, navigate]);

    //Отправка запроса к базе данных через FastAPI и Axios для регистрации
    const handleRegister = async () => { 
        try {
            const response = await axios.post('http://localhost:8000/register/' + Role2, new URLSearchParams({
                username: Username2,
                password: Password2,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            alert('Пользователь зарегистрирован!');
        } catch (error) {
            alert('Ошибка регистрации: ' + (error.response?.data?.detail || '')); 
        } 
    }; 
 

    //Объявление формы для авторизации и регистрации с использованием Button, Input, Select
    return ( 
        <div className='LoginForm'> 
            <h1>Авторизация</h1> 
            <input type="text" placeholder="Логин" value={Username} onChange={e => setUsername(e.target.value)} /> <br/>
            <input type="password" placeholder="Пароль" value={Password} onChange={e => setPassword(e.target.value)} /> <br/>
            <button className='login' onClick={handleLogin}>Войти</button> <br/>
            
            <h1>Регистрация</h1> 
            <input type="text" placeholder="Логин" value={Username2} onChange={e => setUsername2(e.target.value)} /> <br/>
            <input type="password" placeholder="Пароль" value={Password2} onChange={e => setPassword2(e.target.value)} /> <br/>

            <select value={Role2} onChange={(e) => setRole2(e.target.value)} required>
                <option value="">Пациент или врач?</option>
                <option value="patient">Пациент</option>
                <option value="doctor">Врач</option>
            </select>

            <button className='login' onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    );
}; 

export default Login;
