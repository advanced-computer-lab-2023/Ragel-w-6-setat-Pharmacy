import React, { useEffect, useState } from 'react';
import AdminHeader from 'components/Headers/AdminHeader.js';
import { Container, Row, Col } from 'reactstrap';
import AddAdmin from './AddAdmin';

const SystemUsers = () => {
  const ITEMS_PER_PAGE = 5;

  const [patients, setPatients] = useState(null);
  const [pharmacists, setPharmacists] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [patientPage, setPatientPage] = useState(1);
  const [pharmacistPage, setPharmacistPage] = useState(1);
  const [adminPage, setAdminPage] = useState(1);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/admin/getPatientsInfo');
      const json = await response.json();
      if (response.ok) {
        setPatients(json);
      }
    };

    const fetchPharmacists = async () => {
      const response = await fetch('/api/admin/getPharmacistsInfo');
      const json = await response.json();
      if (response.ok) {
        setPharmacists(json);
      }
    };

    const fetchAdmins = async () => {
      const response = await fetch('/api/admin/getAdmins');
      const json = await response.json();
      if (response.ok) {
        setAdmins(json);
      }
    };

    fetchPatients();
    fetchPharmacists();
    fetchAdmins();
  }, []);

  const handleDelete = async (username, userType) => {
    const confirmation = window.confirm(`Are you sure you want to delete ${userType} ${username}?`);

    if (confirmation) {
      try {
        const response = await fetch(`/api/admin/delete${userType}ByUsername/${username}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Refresh the user list after successful deletion
          if (userType === 'Patient') {
            setPatients(patients.filter((patient) => patient.username !== username));
          } else if (userType === 'Pharmacist') {
            setPharmacists(pharmacists.filter((pharmacist) => pharmacist.username !== username));
          } else if (userType === 'Admin') {
            setAdmins(admins.filter((admin) => admin.username !== username));
          }

          console.log(`Deleted ${userType} with username: ${username}`);
        } else {
          console.error(`Failed to delete ${userType} with username: ${username}`);
        }
      } catch (error) {
        console.error(`Error deleting ${userType}:`, error);
      }
    }
  };

  const handleAddAdmin = async ({ username, password }) => {
    try {
      const response = await fetch('/api/admin/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const newAdmin = await response.json();
        setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
        console.log(`Added Admin with username: ${username}`);
      } else {
        console.error(`Failed to add Admin with username: ${username}`);
      }
    } catch (error) {
      console.error('Error adding Admin:', error);
    }
  };

  const paginatePatients = () => {
    const startIndex = (patientPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return patients ? patients.slice(startIndex, endIndex) : [];
  };

  const paginatePharmacists = () => {
    const startIndex = (pharmacistPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return pharmacists ? pharmacists.slice(startIndex, endIndex) : [];
  };

  const paginateAdmins = () => {
    const startIndex = (adminPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return admins ? admins.slice(startIndex, endIndex) : [];
  };

  return (
    <>
      <AdminHeader />
      <Container fluid>
        <Row>
          {/* AddAdmin component */}
          <Col lg="4"></Col>
          <Col lg="4">
            <AddAdmin onAddAdmin={handleAddAdmin} />
          </Col>
          <Col lg="4"></Col>

          {/* Patients Section */}
          <Col lg="4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Patients</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th>Username</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatePatients().map((patient) => (
                        <tr key={patient._id}>
                          <td>{patient.username}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a' }}
                              onClick={() => handleDelete(patient.username, 'Patient')}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <button
                    onClick={() => setPatientPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={!patients || patientPage === 1}
                    className="circle-button"
                    style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a' }}
                  >
                    &lt;
                  </button>
                  <span className="page-number circle-number">{patientPage}</span>
                  <button
                    onClick={() =>
                      setPatientPage((prevPage) => Math.min(prevPage + 1, Math.ceil((patients?.length || 0) / ITEMS_PER_PAGE)))
                    }
                    disabled={!patients || patientPage === Math.ceil((patients?.length || 0) / ITEMS_PER_PAGE)}
                    className="circle-button"
                    style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a' }}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </Col>

          {/* Pharmacist Section */}
          <Col lg="4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Pharmacists</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th>Username</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatePharmacists().map((pharmacist) => (
                        <tr key={pharmacist._id}>
                          <td>{pharmacist.username}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a' }}
                              onClick={() => handleDelete(pharmacist.username, 'Pharmacist')}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <button
                    onClick={() => setPharmacistPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={!pharmacists || pharmacistPage === 1}
                    className="circle-button"
                    style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a' }}
                  >
                    &lt;
                  </button>
                  <span className="page-number circle-number">{pharmacistPage}</span>
                  <button
                    onClick={() =>
                      setPharmacistPage((prevPage) =>
                        Math.min(prevPage + 1, Math.ceil((pharmacists?.length || 0) / ITEMS_PER_PAGE))
                      )
                    }
                    disabled={!pharmacists || pharmacistPage === Math.ceil((pharmacists?.length || 0) / ITEMS_PER_PAGE)}
                    className="circle-button"
                    style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a' }}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </Col>

          {/* Admins Section */}
          <Col lg="4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Admins</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th>Username</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateAdmins().map((admin) => (
                        <tr key={admin._id}>
                          <td>{admin.username}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a' }}
                              onClick={() => handleDelete(admin.username, 'Admin')}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <button
                    onClick={() => setAdminPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={!admins || adminPage === 1}
                    className="circle-button"
                    style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a' }}
                  >
                    &lt;
                  </button>
                  <span className="page-number circle-number">{adminPage}</span>
                  <button
                    onClick={() =>
                      setAdminPage((prevPage) => Math.min(prevPage + 1, Math.ceil((admins?.length || 0) / ITEMS_PER_PAGE)))
                    }
                    disabled={!admins || adminPage === Math.ceil((admins?.length || 0) / ITEMS_PER_PAGE)}
                    className="circle-button"
                    style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a' }}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
          }

          .circle-button {
            background-color: #dc3545;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            margin: 0 5px;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
          }

          .circle-button:hover {
            background-color: #c82333;
          }

          .circle-number {
            background-color: #009688;
            color: #fff;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            padding: 8px;
            line-height: 1;
            text-align: center;
            font-size: 16px;
          }
        `}
      </style>
    </>
  );
};

export default SystemUsers;