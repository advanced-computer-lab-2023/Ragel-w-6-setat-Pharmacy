import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
// Import your pages/components here...
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Patient from './pages/Patient';
import Pharmacist from './pages/Pharmacist';
import Admin from './pages/Admin';  



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/login" element={<Login />} />
            <Route path="/api/register" element={<Register />} />
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
