import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="logo-container">
    
      </div>
     
      <div className="buttons-container">
       
        <Link to="/Pharmacist" className="registration-button">
          Login as a Pharmacist
        </Link>
       
        <Link to="/Patient" className="registration-button">
        Login as a Patient
        </Link>
        <Link to="/Admin" className="registration-button">
        Login as an Admin
        </Link>
       
      </div>
    </div>
  );
};

export default LoginPage;
