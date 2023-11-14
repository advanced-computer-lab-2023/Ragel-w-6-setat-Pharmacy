import React, { useEffect, useState } from 'react';


// components
import AdminDetails from 'components/AdminComponents/AdminDetails.js';
import AdminAdd from 'components/AdminComponents/AddAdmin.js';
import AdminDelete from 'components/AdminComponents/DeleteAdmin.js';

const Admin = () => {
  const [admins, setAdmins] = useState(null);

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
  }, []); // empty array means it will only run once

  return (
    <div className="container-fluid">
      <AdminAdd />
      <AdminDelete />

      <div className="row">
        <div className="col-lg-12">
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
                      <th>Password</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins &&
                      admins.map((admin) => (
                        <AdminDetails key={admin._id} admin={admin} />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
