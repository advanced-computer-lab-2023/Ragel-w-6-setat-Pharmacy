import React, { useEffect, useState } from 'react';
//import MedicineDetails from '../components/Medicine/MedicineDetails';
//import '../css/GetAllMedicine.css';
import axios from 'axios';
import AdminHeader from '../../components/Headers/AdminHeader';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

 
const GetAllMedicinesPharm = () => {
    const [medicine, setMedicine] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState('');
    const [cart, setCart] = useState([]);
    //const patientId = '654beffcf9d0ca04d098b0e3';
    const [shouldRefresh, setShouldRefresh] = useState(false);
   

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('/api/pharmacist/getAllMedicines');
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        };

        fetchMedicines();
    }, [shouldRefresh]); // Add shouldRefresh as a dependency

    const handleToggleArchive = async (medicinesId, isArchived) => {
        try {
            if (isArchived) {
                await unarchiveMedicine(medicinesId);
            } else {
                await archiveMedicine(medicinesId);
            }
            setShouldRefresh(!shouldRefresh); // Trigger refresh after state change
        } catch (error) {
            console.error('Error toggling archive:', error.message);
        }
    };

    const archiveMedicine = async (id) => {
        try {
            const response = await axios.put(`/api/pharmacist/archiveMedicine/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to archive medicine');
            }
        } catch (error) {
            console.error('Error archiving medicine:', error.message);
            throw error;
        }
    };

    const unarchiveMedicine = async (id) => {
        try {
            const response = await axios.put(`/api/pharmacist/unarchiveMedicine/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to unarchive medicine');
            }
        } catch (error) {
            console.error('Error unarchiving medicine:', error.message);
            throw error;
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim() !== '') {
            const response = await fetch(`/api/patient/getMedicineByName?name=${searchTerm}`);
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        } else {
            const response = await fetch('/api/pharmacist/getAllMedicines');
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        }
    };

    const handleFilter = async () => {
        if (selectedMedicinalUse.trim() === '') {
            const response = await fetch('/api/pharmacist/getAllMedicines'); //retrieves all medicines
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
        <>
     
     <Container>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 d-flex">
                    <div className="form-group flex-grow-1">
                    <input
                            type="text"
                            className="form-control"
                            placeholder="Search medicine..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '1070px' }} 
                        />
                         </div>
                          <button className="ni ni-zoom-split-in text-white" 
                          style={{ backgroundColor: "#009688" ,width:"200px",height:"40px",border:"none",borderRadius: '4px',}} 
                          onClick={handleSearch}></button>
                   
                </div>
                <div className="col-md-5 d-flex ">
                    <div className="form-group ">
                        <select
                            className="form-control"
                            value={selectedMedicinalUse}
                            onChange={(e) => setSelectedMedicinalUse(e.target.value)}
                            style={{ width: '120px',}} 
                            
                        >
                            
                            <option value="">No filter</option>
                            {medicine &&
                                Array.from(new Set(medicine.flatMap((med) => med.medicinalUse))).map((use) => (
                                    <option key={use} value={use}>
                                        {use}
                                    </option>
                                ))}
                        </select>
                        </div>
                        <button className="ni ni-ui-04 text-white" style={{ backgroundColor: "#009688",border:"none",height:"36px",borderRadius: '4px'}} onClick={handleFilter}></button>
                        </div>
            </div>

            <div className="row">
        {medicine &&
          medicine.map((medicines) => (
            <div key={medicines.name} className="col-md-4 mb-4">
              <MedicineDetails
                medicines={medicines}
                handleToggleArchive={(isArchived) => handleToggleArchive(medicines._id, isArchived)}
                />
            </div>

            
                    ))}
            </div>
        </div>
    </Container>
    </>
    );
};

export default GetAllMedicinesPharm;

const MedicineDetails = ({ medicines,handleToggleArchive }) => {

    const [isArchived, setIsArchived] = useState(medicines.archived);

   

    const archiveMedicine = async (id) => {
        try {
            const response = await axios.put(`/api/pharmacist/archiveMedicine/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to archive medicine');
            }
        } catch (error) {
            console.error('Error archiving medicine:', error.message);
            throw error;
        }
    };

    const unarchiveMedicine = async (id) => {
        try {
            const response = await axios.put(`/api/pharmacist/unarchiveMedicine/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to unarchive medicine');
            }
        } catch (error) {
            console.error('Error unarchiving medicine:', error.message);
            throw error;
        }
    };
    //TODO should we view out of stock or not status as well?
  
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
          <p className="card-text">
                    <strong>Status: </strong>
                    {medicines.archived ? 'Archived' : 'Unarchived'}
                </p>
                <button  className="btn btn-success"style={{ backgroundColor: "#009688" }}onClick={() => handleToggleArchive(medicines.archived)}>
                    {medicines.archived ? 'Unarchive' : 'Archive'}
                </button>
                <Link  to="/pharmacist/EditMedicine"
                            className="btn btn-success"
                            style={{ backgroundColor: "#00796B" }}
                            onClick={() =>{}}
                >
                  Edit
                </Link>
        </div>
      </div>
    );
  };
  
 