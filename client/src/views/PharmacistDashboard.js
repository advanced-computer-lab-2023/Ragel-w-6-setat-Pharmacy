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
      </Container>
    </>
  );
};

export default PharmacistDashboard;