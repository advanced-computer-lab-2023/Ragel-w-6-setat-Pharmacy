import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
//pages and components

import Navbar from './components/Navbar';
import Medicine from './pages/Pharmacist';
import RegistrationPage from './pages/Registration';
import PatientRegistrationForm from './components/PatientRegistration';
import PharmacistRegistrationForm from './components/PharmacistRegistration';
import LoginPage from './pages/Login';
import EditMedicineForm from './Pharmacist_components/EditMedicine';
import AddNewMedicine from './Pharmacist_components/AddMedicine';

//import LoginComponent from './components/Login';

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
</Routes>


      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
