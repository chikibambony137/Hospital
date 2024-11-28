import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login'; 
import DoctorsList from './components/DoctorsList'; 
import PatientsList from './components/PatientsList'; 
import PatientExams from './components/PatientExams';
import styles from './styles.css'
 
const App = () => { 
    return ( 
        <Router> 
            <Routes> 
                <Route path="/" element={<Login />} /> 
                <Route path="/doctors" element={<DoctorsList />} /> 
                <Route path="/patients" element={<PatientsList />} /> 
                <Route path="/patients/:id" element={<PatientExams />} /> 
            </Routes> 
        </Router> 
    ); 
}; 
 
export default App;