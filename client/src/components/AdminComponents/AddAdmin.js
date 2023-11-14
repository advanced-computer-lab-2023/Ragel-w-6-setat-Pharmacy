import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminAdd = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admin = { username, password };

    const response = await fetch('/api/admin/addAdmin', {
      method: 'POST',
      body: JSON.stringify(admin),
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
    <div className="container">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Admin</h3>
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
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Admin
        </button>
        {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">Admin added successfully!</div>
        )}
      </form>
    </div>
  );
};

export default AdminAdd;
