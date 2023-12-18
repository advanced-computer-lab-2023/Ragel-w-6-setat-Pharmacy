import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
// import PatientAuthLayout from "layouts/PatientAuth.js";
import Auth from "./layouts/Auth.js";
// import PharmacistAuthLayout from "layouts/PharmacistAuth.js";
import PatientLayout from "layouts/Patient.js";
import PharmacistLayout from "layouts/Pharmacist.js";
import UserContextProvider from "contexts/UserContext";
import { AuthContextProvider } from "contexts/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
  <AuthContextProvider>
    <UserContextProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/patient/*" element={<PatientLayout />} />
        <Route path="/pharmacist/*" element={<PharmacistLayout />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
     </UserContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);