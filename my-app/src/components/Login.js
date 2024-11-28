import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
 
const Login = () => { 
    const [Username, setUsername] = useState(''); 
    const [Password, setPassword] = useState(''); 
    const navigate = useNavigate(); 
 
    const handleLogin = async () => { 
        const response = await axios.post('http://localhost:8000/login/', {"Username": Username, "Password": Password}); 
        if (response.data.success) { 
            navigate('/doctors'); 
        } else { 
            alert('Неверный логин или пароль' + response.data.message); 
        } 
    }; 
 
    return ( 
        <div> 
            <h1>Авторизация</h1> 
            <input type="text" placeholder="Логин" value={Username} onChange={e => setUsername(e.target.value)} /> 
            <input type="password" placeholder="Пароль" value={Password} onChange={e => setPassword(e.target.value)} /> 
            <button onClick={handleLogin}>Войти</button> 
        </div> 
    ); 
}; 
 
export default Login;