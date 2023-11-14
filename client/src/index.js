import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import PatientLayout from "layouts/Patient.js";
import PharmacistLayout from "layouts/Pharmacist.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/patient/*" element={<PatientLayout />} />
      <Route path="/pharmacist/*" element={<PharmacistLayout />} />
      {/* Add a default route to redirect to a different URL */}
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
    </Routes>
  </BrowserRouter>
);
