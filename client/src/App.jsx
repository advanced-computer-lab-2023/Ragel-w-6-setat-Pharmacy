import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Patient from './pages/Patient';
import Pharmacist from './pages/Pharmacist';
import Admin from './pages/Admin';
import GetAllMedicines from './pages/GetAllMedicines'
import Medicine from './pages/Pharmacist';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/Login';

// components
import Navbar from './components/Navigation/Navbar';
import PatientRegistrationForm from './components/Registration/PatientRegistration';
import PharmacistRegistrationForm from './components/Registration/PharmacistRegistration';
import EditMedicineForm from './components/Pharmacist/EditMedicine';
import AddNewMedicine from './components/Pharmacist/AddMedicine';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<RegistrationPage />}
            />
            <Route
              path='/PatientRegistration'
              element={<PatientRegistrationForm />}
            />
            <Route
              path='/Login'
              element={<LoginPage />}
            />
            <Route
              path='/PharmacistRegistration'
              element={<PharmacistRegistrationForm />}
            />

            <Route
              path='/Pharmacist'
              element={<Medicine />}
            />
            <Route
              path='/EditMedicine'
              element={<EditMedicineForm />}
            />
            <Route
              path='/AddMedicine'
              element={<AddNewMedicine />}
            />
            <Route path="/api/patient" element={<Patient />} />
            <Route path="/api/pharmacist" element={<Pharmacist />} />
            <Route path="/api/admin" element={<Admin />} />
            <Route
              path="/viewAllMedicines"
              element={<GetAllMedicines />}
            />
            <Route
              path="/Patient"
              element={<Patient />}
            />
          </Routes>


        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;