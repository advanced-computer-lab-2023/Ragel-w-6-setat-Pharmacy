import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from './pages/Patient';
import Pharmacist from './pages/Pharmacist';
import Admin from './pages/Admin';  
import Navbar from './components/Navbar';
import Medicine from './pages/Pharmacist';
import RegistrationPage from './pages/Registration';
import PatientRegistrationForm from './components/PatientRegistration';
import PharmacistRegistrationForm from './components/PharmacistRegistration';
import LoginPage from './pages/Login';
import EditMedicineForm from './components/Pharmacist_components/EditMedicine';
import AddNewMedicine from './components/Pharmacist_components/AddMedicine';

//functions

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

</Routes>


      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
