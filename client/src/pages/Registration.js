import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const RegistrationPage = () => {
  return (
    <div className="registration-container">
      <div className="logo-container">
        {/* Assume you have a logo image, replace 'logo.png' with your actual logo file */}
      </div>
     
      <div className="buttons-container">
        {/* Button to navigate to the first registration form */}
        <Link to="/PharmacistRegistration" className="registration-button">
          Register as a Pharmacist
        </Link>
        {/* Button to navigate to the second registration form */}
        <Link to="/PatientRegistration" className="registration-button">
        Register as a Patient
        </Link>
        <Link to="/Login" className="registration-button">
          Login 
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
