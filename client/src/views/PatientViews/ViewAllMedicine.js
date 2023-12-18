import React, { useEffect, useState, useContext } from 'react';
//import MedicineDetails from '../components/Medicine/MedicineDetails';
//import '../css/GetAllMedicine.css';
import axios from 'axios';
import AdminHeader from '../../components/Headers/AdminHeader';
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IconButton from '@mui/material/IconButton';
import { UserContext } from "../../contexts/UserContext";


const GetAllMedicines = () => {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicine, setMedicine] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState('');
    const [cart, setCart] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [medicineIdForAlternative, setMedicineIdForAlternative] = useState(null);
    const [showMedicineAlternativeModal, setShowMedicineAlternativeModal] = useState(false);

    

    const patientId = user._id;

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('/api/patient/getAllMedicines');
            const json = await response.json();

            if (response.ok) {
                const activeMedicines = json.filter((med) => !med.archived);
                setMedicine(activeMedicines);
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

    const handleAddToCart = async (medicineId) => {
        try {
            const response = await axios.get(`/api/patient/addToCart/${patientId}/${medicineId}`);
            const { success, message } = response.data;

            if (success) {
                // Refresh cart after adding an item
                const cartResponse = await axios.get(`/api/patient/viewCart/${patientId}`);
                setCart(cartResponse.data);
                setSuccessMessage('Added to cart successfully!');
                setShowMedicineAlternativeModal(false);  // Close the alternative modal if open
                setIsModalOpen(true);
            } else {
                // If adding to cart is not successful, show alternative medicine modal
                setMedicineIdForAlternative(medicineId);
                setShowMedicineAlternativeModal(true);
                setIsModalOpen(false);  // Close the success modal if open
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    

    
    
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div  className="col-md-8 d-flex">
                    <div  className="form-group flex-grow-1">
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
              <MedicineDetails medicines={medicines} handleAddToCart={handleAddToCart} />
            </div>
            
                    ))}
            </div>
           {/* Modal for success message */}
           <Modal isOpen={isModalOpen && !showMedicineAlternativeModal} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>Success</ModalHeader>
    <ModalBody>
        <p>{successMessage}</p>
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" style={{ backgroundColor: "#009688" }} onClick={toggleModal}>
            Close
        </Button>
    </ModalFooter>
</Modal>

               {/* MedicineAlternative modal */}
          
            {medicineIdForAlternative && (
                <MedicineAlternative
                    medicineId={medicineIdForAlternative}
                    showModal={showMedicineAlternativeModal}
                    setShowModal={setShowMedicineAlternativeModal}
                />
            )}
        </div>
    );
};

export default GetAllMedicines;

const MedicineDetails = ({ medicines, handleAddToCart }) => {
    const handleAddToCartClick = async () => {
      // Call the parent component's onAddToCart function
      handleAddToCart(medicines._id); // Assuming medicines._id is the medicineId
    };
  
    return (
        <>
      <AdminHeader />
      {/* Page content */}
     <Container>
     
    
    
     
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
          <button onClick={handleAddToCartClick} className="btn btn-success"style={{ backgroundColor: "#009688" }} >
            Add to Cart
          </button>
        </div>
      </div>
      </Container>
      </>
    );
  };

// ... (other imports)

const MedicineAlternative = ({ medicineId, showModal, setShowModal }) => {
    const [alternativeData, setAlternativeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicineAlternative = async () => {
            try {
                const response = await axios.get(`/api/patient/medAlternatives/${medicineId}`);
                setAlternativeData(response.data);
            } catch (error) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicineAlternative();
    }, [medicineId]);

    const handleCloseModal = () => {
        setAlternativeData(null);
        setShowModal(false);
    };

    return (
        <Modal isOpen={showModal} toggle={handleCloseModal}>
            <ModalHeader toggle={handleCloseModal}>Medicine Alternative Information</ModalHeader>
            <ModalBody>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {alternativeData && (
                    <>
                        <h2>{alternativeData.message}</h2>
                        {/* Add more content based on alternativeData if needed */}
                    </>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" style={{ backgroundColor: "#009688" }} onClick={handleCloseModal}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};





  