import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const Login = () => { 
    const [Username, setUsername] = useState(''); 
    const [Password, setPassword] = useState(''); 
    const [Username2, setUsername2] = useState(''); 
    const [Password2, setPassword2] = useState(''); 
    const navigate = useNavigate(); 

    const handleLogin = async () => { 
        try {
            const response = await axios.post('http://localhost:8000/token', new URLSearchParams({
                username: Username,
                password: Password,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            navigate('/doctors')
        } catch (error) {
            alert('Неверный логин или пароль. ' + (error.response?.data?.detail || '')); 
        } 
    };

    const handleRegister = async () => { 
        try {
            const response = await axios.post('http://localhost:8000/register', new URLSearchParams({
                username: Username2,
                password: Password2,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            alert('Пользователь зарегистрирован!')
        } catch (error) {
            alert('Ошибка регистрации: ' + (error.response?.data?.detail || '')); 
        } 
    }; 
 
    return ( 
        <div className='LoginForm'> 
            <h1>Авторизация</h1> 
            <input type="text" placeholder="Логин" value={Username} onChange={e => setUsername(e.target.value)} /> <br/>
            <input type="text" placeholder="Пароль" value={Password} onChange={e => setPassword(e.target.value)} /> <br/>
            <button className='login' onClick={handleLogin}>Войти</button> <br/>

            <h1>Регистрация</h1> 
            <input type="text" placeholder="Логин" value={Username2} onChange={e => setUsername2(e.target.value)} /> <br/>
            <input type="text" placeholder="Пароль" value={Password2} onChange={e => setPassword2(e.target.value)} /> <br/>
            <button className='login' onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    );
}; 

export default Login;
