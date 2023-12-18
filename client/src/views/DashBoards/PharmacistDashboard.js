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
  CardTitle,
  Table
} from "reactstrap";
// core components
import React, { useState, useEffect,useContext } from 'react';
import PharmacistHeader from "components/Headers/PharmacistHeader.js";
import axios from 'axios'; // Import Axios for making API calls
import { UserContext } from "../../contexts/UserContext";




const PharmacistDashboard = () => {
  const { user } = useContext(UserContext);
  const [walletBalance, setWalletBalance] = useState(0);
  const [medicinesOutOfStock, setMedicinesOutOfStock] = useState([]);
  const pharmacistId = user._id;


  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(`/api/pharmacist/getWalletBalance/${pharmacistId}`);
        const { walletBalance } = response.data;
        setWalletBalance(walletBalance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    fetchWalletBalance();
  }, [user._id]);

  useEffect(() => {
    const fetchMedicinesOutOfStock = async () => {
      try {
        const response = await fetch('/api/pharmacist/getAllMedicinesOutOfStock');
        const json = await response.json();

        if (response.ok) {
          setMedicinesOutOfStock(json);
        } else {
          console.error('Failed to fetch medicines out of stock:', json.error);
        }
      } catch (error) {
        console.error('Error fetching medicines out of stock:', error.message);
      }
    };

    fetchMedicinesOutOfStock();
  }, []); // empty array means it will only run once
  return (
    <>
      <PharmacistHeader />
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
      </Container>
      <div className="container mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h3">Out Of Stock Notifications</CardTitle>
          <Table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {medicinesOutOfStock.map((medicine) => (
                <tr key={medicine._id}>
                  <td>{medicine.name}</td>
                  <td>Out of Stock</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
    </>
  );
};

export default PharmacistDashboard;

