import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
/* import PatientAuthLayout from "layouts/PatientAuth";
import PharmacistAuthLayout from "layouts/PharmacistAuth"; */
import PatientLayout from "layouts/Patient";
import PharmacistLayout from "layouts/Pharmacist";
import NotFound from "components/NotFound"; // A custom NotFound component


//TODO breadcrumbs and pagination
function App() {
  return (
    <div className="App"> {/* This div is not necessary, but it is a good practice to wrap all the components in a div */}
     <BrowserRouter>
       <div className="pages"> {/* This div is not necessary, but it is a good practice to wrap all the components in a div */}
        <Routes>
         <Route path="/admin/*" element={<AdminLayout />} />
         <Route path="/auth/*" element={<AuthLayout />} />
        
        <Route path="/patient/*" element={<PatientLayout />} /> 
        <Route path="/pharmacist/*" element={<PharmacistLayout />} />
         <Route path="*" element={<NotFound />} /> {/* Custom NotFound component */}
        </Routes>
       </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
