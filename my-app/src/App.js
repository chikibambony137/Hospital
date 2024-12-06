import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login'; 
import DoctorsList from './components/DoctorsList'; 
import PatientsList from './components/PatientsList'; 
import styles from './styles.css'
import AddPatient from './components/AddPatient';
import InspectionsList from './components/InspectionsList';
 
const App = () => { 
    return ( 
        <Router> 
            <Routes> 
                <Route path="/" element={<Login />} /> 
                <Route path="/doctors" element={<DoctorsList />} /> 
                <Route path="/patients" element={<PatientsList />} />
                <Route path="/patients/add" element={<AddPatient />} /> 
                <Route path="/inspections" element={<InspectionsList />} />
            </Routes> 
        </Router> 
    ); 
}; 
 
export default App;