import React, { useEffect, useState } from 'react';

// components
import AdminViewPharmacistInfo from 'components/AdminComponents/AdminViewPharmacistInfo';
import DeletePharmacist from 'components/AdminComponents/DeletePharmacist';

const Pharmacist = () => {
  const [pharmacists, setPharmacists] = useState(null);

  useEffect(() => {
    const fetchPharmacists = async () => {
      const response = await fetch('/api/admin/getPharmacistsInfo');
      const json = await response.json(); // array of objects where each represents a pharmacist
      console.log(json);
      if (response.ok) {
        setPharmacists(json);
      }
    };

    fetchPharmacists();
  }, []); // empty array means it will only run once

  return (
    <div className="container-fluid">
      <DeletePharmacist />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Pharmacists</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Email</th>
                      <th>Date of Birth</th>
                      <th>Hourly Rate</th>
                      <th>Affiliation</th>
                      <th>Educational Background</th>
                      <th>Time Stamp</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pharmacists &&
                      pharmacists.map((pharmacist) => (
                        <AdminViewPharmacistInfo
                          key={pharmacist._id}
                          pharmacist={pharmacist}
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
  );
};

export default Pharmacist;
