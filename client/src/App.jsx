import './App.css';
import { useState, useEffect } from "react";
import Home from './pages/Home';
import Patient from './pages/Patient';
import Pharmacist from './pages/Pharmacist';
import Admin from './pages/Admin';  
import Navbar from './components/Navbar';
import Medicine from './pages/Pharmacist';
import RegistrationPage from './pages/Registration';
import PatientRegistrationForm from './components/PatientRegistration';
import PharmacistRegistrationForm from './components/PharmacistRegistration';
import LoginPage from './pages/Login';
import EditMedicineForm from './Pharmacist_components/EditMedicine';
import AddNewMedicine from './Pharmacist_components/AddMedicine';

//functions
import { getTest } from "./functions/test";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <Routes>
        <Route
        path='/'
        element={<RegistrationPage/>}
/>
<Route
        path='/PatientRegistration'
        element={<PatientRegistrationForm/>}
/>
<Route
        path='/Login'
        element={<LoginPage/>}
/>
<Route
        path='/PharmacistRegistration'
        element={<PharmacistRegistrationForm/>}
/>

<Route
        path='/Pharmacist'
        element={<Medicine/>}
/>
<Route
        path='/EditMedicine'
        element={<EditMedicineForm/>}
/>
<Route
        path='/AddMedicine'
        element={<AddNewMedicine/>}
/>
<Route path="/api/patient" element={<Patient />} />
            <Route path="/api/pharmacist" element={<Pharmacist />} /> 
            <Route path="/api/admin" element={<Admin />} /> 
            <Route path="/" element={<Home />} />

</Routes>


      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
