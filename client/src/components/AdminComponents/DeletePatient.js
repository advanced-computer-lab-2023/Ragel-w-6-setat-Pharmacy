import React, { useState } from 'react';

const AdminDeletePatient = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  

  const handleClick = async (e) => {
    e.preventDefault();

    const patient = { username };
    console.log("patient to be deleted: " + patient.username);

    const response = await fetch(`/api/admin/deletePatientByUsername/${patient.username}`, {
      method: 'DELETE',
    });

    const json = await response.json();
    console.log("deleted patient: " + json);

    if (!response.ok) {
      setError(json.error);
      setSuccess(false);
    } else {
      setUsername('');
      setError(null);
      setSuccess(true);
    }
  };

  return (
    <div className="container">
      <form className="delete-form" onSubmit={handleClick}>
        <h3 className="text-center text-uppercase">Delete a Patient</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <button type="submit" className="btn btn-danger btn-block">
          Delete Patient
        </button>
        {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">Patient deleted successfully!</div>
        )}
      </form>
    </div>
  );
};

export default AdminDeletePatient;
