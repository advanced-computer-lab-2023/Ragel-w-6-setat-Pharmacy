import React, { useEffect, useState } from 'react';
//import MedicineDetails from '../components/Medicine/MedicineDetails';
//import '../css/GetAllMedicine.css';
import axios from 'axios';
 
const GetAllMedicinesPharm = () => {
    const [medicine, setMedicine] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState('');
    const [cart, setCart] = useState([]);

    

    const patientId = '654beffcf9d0ca04d098b0e3';

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('/api/patient/getAllMedicines');
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        };

        fetchMedicines();
    }, []);

    const handleSearch = async () => {
        if (searchTerm.trim() !== '') {
            const response = await fetch(`/api/patient/getMedicineByName?name=${searchTerm}`);
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        } else {
            const response = await fetch('/api/patient/getAllMedicines');
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        }
    };

    const handleFilter = async () => {
        if (selectedMedicinalUse.trim() === '') {
            const response = await fetch('/api/patient/getAllMedicines');
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        } else {
            const filteredMedicines = medicine.filter((med) => {
                if (Array.isArray(med.medicinalUse)) {
                    return med.medicinalUse.some(use => use.trim() === selectedMedicinalUse.trim());
                } else if (typeof med.medicinalUse === 'string') {
                    return med.medicinalUse.trim() === selectedMedicinalUse.trim();
                }
                return false;
            });
            setMedicine(filteredMedicines);
        }
    };

   
      

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search medicine..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                          <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <select
                            className="form-control"
                            value={selectedMedicinalUse}
                            onChange={(e) => setSelectedMedicinalUse(e.target.value)}
                        >
                            <option value="">No filter</option>
                            {medicine &&
                                Array.from(new Set(medicine.flatMap((med) => med.medicinalUse))).map((use) => (
                                    <option key={use} value={use}>
                                        {use}
                                    </option>
                                ))}
                        </select>
                        <button onClick={handleFilter}>Filter</button>

                    </div>
                </div>
            </div>

            <div className="row">
        {medicine &&
          medicine.map((medicines) => (
            <div key={medicines.name} className="col-md-4 mb-4">
              <MedicineDetails medicines={medicines}  />
            </div>
            
            
                    ))}
            </div>
        </div>
    );
};

export default GetAllMedicinesPharm;

const MedicineDetails = ({ medicines }) => {
  
    return (
      <div className="card">
        <img
          src={`data:image/png;base64,${medicines.image}`}
          className="card-img-top"
          alt={medicines.name}
        />
        <div className="card-body">
          <h5 className="card-title">{medicines.name}</h5>
          <p className="card-text">
            <strong>Price: </strong>
            {medicines.price}
          </p>
          <p className="card-text">
            <strong>Description: </strong>
            {medicines.description}
          </p>
          <p className="card-text">
            <strong>Medicinal Use: </strong>
            {Array.isArray(medicines.medicinalUse)
              ? medicines.medicinalUse.map((use, index) => (
                  <span key={index}>{use}</span>
                ))
              : medicines.medicinalUse}
          </p>
         
        </div>
      </div>
    );
  };
  
 