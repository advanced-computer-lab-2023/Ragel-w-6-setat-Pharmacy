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
import React, { useState, useEffect, useContext } from 'react';
import AdminHeaderDashBoard from "components/Headers/AdminHeaderDashBoard.js";
import axios from 'axios'; // Import Axios for making API calls
import { UserContext } from "../../contexts/UserContext";




const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const [walletBalance, setWalletBalance] = useState(0);
  const patientId = user._id;


  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(`/api/patient/getWalletBalance/${patientId}`);
        const { walletBalance } = response.data;
        setWalletBalance(walletBalance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    fetchWalletBalance();
  }, [user._id]);

  return (
    <>
      <AdminHeaderDashBoard />
      {/* Page content */}
      <Container className="mt--7" fluid>
        
      </Container>
    </>
  );
};

export default AdminDashboard;

