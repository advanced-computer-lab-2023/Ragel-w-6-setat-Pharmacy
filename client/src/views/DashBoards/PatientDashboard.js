import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import PatientHeader from "components/Headers/PatientHeader.js";
import { useNavigate } from 'react-router-dom';

const PatientDashBoard = () => {
  const { user } = useContext(UserContext);
  const [walletBalance, setWalletBalance] = useState(0);
  const [prescriptions, setPrescriptions] = useState([]);
  const patientId = user._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch wallet balance
        const walletResponse = await axios.get(`/api/patient/getWalletBalance/${patientId}`);
        const { walletBalance } = walletResponse.data;
        setWalletBalance(walletBalance);

        const prescriptionsResponse = await axios.get(`/api/patient/viewPrescription/${patientId}`);
        console.log('Prescriptions Response:', prescriptionsResponse.data);

        // Update this line to correctly access the nested 'prescriptions' array
        setPrescriptions(prescriptionsResponse.data.prescriptions);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [patientId]);

  const handleAddToCart = async (prescriptionId) => {
    try {
      console.log(prescriptionId)
      await axios.post(`/api/patient/addPrescriptionToCart/${patientId}`, { prescriptionId: prescriptionId });

      // Redirect to Checkout page
      navigate('/patient/checkout');

    } catch (error) {
      console.error('Error adding prescription to cart:', error);
    }
  };


  return (
    <>
      <PatientHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <div style={{ bottom: '35%', left: '40%', padding: '20px', backgroundColor: '#009688', color: 'white', textAlign: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <h4 style={{ margin: 0, marginBottom: '10px', color: 'white' }}>My Wallet Balance</h4>
              <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{walletBalance}</p>
            </div>
          </Col>
        </Row>
        <Row>
          {prescriptions.map((prescription) => (
            <Col key={prescription._id} xl="4">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <h3 className="mb-0">Prescription ID: {prescription._id}</h3>
                </CardHeader>
                <CardBody>
                  <div>Prescription Date: {prescription.date}</div>
                  <div>Notes: {prescription.notes}</div>

                  {/* Display details about medicines */}
                  <div>
                    <h5>Medicines:</h5>
                    <ul>
                      {prescription.medication.map((medicine) => (
                        <li key={medicine.medicineId}>
                          {medicine.name} - Dosage: {medicine.dosage}, Price: {medicine.price}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button color="primary" 
                  style={{backgroundColor: '#009688'}}
                  onClick={() => handleAddToCart(prescription._id)}>
                    Add Medicines to Cart
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default PatientDashBoard;

