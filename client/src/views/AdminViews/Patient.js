import React, { useEffect, useState } from 'react';
import AdminHeader from 'components/Headers/AdminHeader.js';
import { Container } from 'reactstrap';

// components
import AdminViewPatientsInfo from 'components/AdminComponents/AdminViewPatientsInfo.js';
import AdminDeletePatient from 'components/AdminComponents/DeletePatient.js';

const Patients = () => {
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/admin/getPatientsInfo');
      const json = await response.json(); // array of objects where each represents a patient
      console.log(json);
      if (response.ok) {
        setPatients(json);
      }
    };
    fetchPatients();
  }, []); // empty array means it will only run once

  return (
    <>
      <AdminHeader />
      {/* Page content */}
      <Container>
        <div className="container-fluid">
          <AdminDeletePatient />
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Patients</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table tablesorter">
                      <thead className="text-primary">
                        <tr>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Password</th>
                          <th>Date of birth</th>
                          <th>Gender</th>
                          <th>Mobile Number</th>
                          <th>Emergency Contact Name </th>
                          <th>Emergency Contact Mobile </th>
                          <th>Emergency Contact Relation </th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients &&
                          patients.map((patient) => (
                            <AdminViewPatientsInfo
                              key={patient._id}
                              patient={patient}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Patients;