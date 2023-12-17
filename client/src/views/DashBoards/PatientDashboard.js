/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import React, { useState, useEffect,useContext } from 'react';
import UserHeader from "components/Headers/UserHeader.js";

import { useState, useContext } from "react";
import axios from 'axios'; // Import Axios for making API calls
import { UserContext } from "../../contexts/UserContext";


const PatientDashBoard = () => {
  const user= JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const { user } = useContext(UserContext);
  const [patientDetails, setPatientDetails] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  const patientId = user._id;

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch patient details
        const response = await axios.get(`/api/patient/getPatientDetails/${patientId}`); // Provide the correct endpoint
        setPatientDetails(response.data.patient);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    // Call the function to fetch patient details
    fetchPatientDetails();
  }, []);
  const getWalletBalance = async () => {
    try {
        const response = await fetch(`/api/patient/getWalletBalance/${patientId}`);
        if (response.ok) {
            const data = await response.json();
            return data.walletBalance;
        } else {
            console.error("Error fetching wallet balance:", response.statusText);
            return 0; // Return a default value in case of an error
        }
    } catch (error) {
        console.error("Error fetching wallet balance:", error);
        return 0; // Return a default value in case of an error
    }
};

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                     
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {patientDetails && (
                      <>
                        {patientDetails.name}
                        <span className="font-weight-light">, {patientDetails.dateOfBirth}</span>
                      </>
                    )}
                  </h3>
                  {patientDetails && (
                    <>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        {patientDetails.username}
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        {patientDetails.email}
                      </div>
                      <div>
                        <i className="ni education_hat mr-2" />
                        {patientDetails.gender}
                      </div>
                      <hr className="my-4" />
                      <p>{patientDetails.mobileNumber}</p>
                      {/* Add more details as needed */}
                    </>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <div style={{ bottom: '35%', left: '40%', padding: '20px', backgroundColor: '#B2DFDB', color: 'bLACK', textAlign: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <h4 style={{ margin: 0, marginBottom: '10px', color: 'BLACK' }}>Wallet Balance</h4>
              <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{patientDetails && `$${patientDetails.walletBalance}`}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PatientDashBoard;

