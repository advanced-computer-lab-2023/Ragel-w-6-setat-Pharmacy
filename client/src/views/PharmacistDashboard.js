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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import AdminHeader from "components/Headers/AdminHeader.js";
import AddAdmin from "components/AdminComponents/AddAdmin.js";
import AdminDetails from "components/AdminComponents/AdminDetails.js";
import DeleteAdmin from "components/AdminComponents/DeleteAdmin.js";
import { useEffect } from "react";
const PharmacistDashboard = (props) => {
  /* const [admins, setAdmins] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('/api/admin/getAdmins');
      const json = await response.json(); // array of objects where each represents an admin
      console.log(json);
      if (response.ok) {
        setAdmins(json);
      }
    };

    fetchAdmins();
  }, []); // empty array means it will only run once */
    const [username, setUsername] = useState('');
    const [newPassword, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const pharmacist = { username, newPassword };
  
      const response = await fetch('/api/pharmacist/changePharmacistPassword', {
        method: 'POST',
        body: JSON.stringify(pharmacist),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.error);
        setSuccess(false);
      } else {
        setUsername('');
        setPassword('');
        setError(null);
        setSuccess(true);
      }
    };

    const [medicinesOutOfStock, setMedicinesOutOfStock] = useState([]);

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
      <AdminHeader />
      {/* Page content */}
     <Container>
  
    <div className="container">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Change Password</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={newPassword}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
        {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">Pharmacist password changed successfully!</div>
        )}
      </form>
    </div>
    <div className="container mt-5">
          <h3>Notifications</h3>
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
        </div>
  



     
    
    
     </Container>
    
    </>
  );
};

export default PharmacistDashboard;
