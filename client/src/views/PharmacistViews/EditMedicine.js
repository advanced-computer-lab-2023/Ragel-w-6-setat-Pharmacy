import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/Headers/AdminHeader';
import { Container } from 'reactstrap';

const EditMedicineForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Medicine = { name, price, description };

    const response = await fetch('/api/pharmacist/editMedicine', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Medicine),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess(false);
    } else {
      setSuccess(true);
      setError('Edited Medicine');
    }
  };

  return (
    <>
      <AdminHeader />
      {/* Page content */}
     <Container>
     <div className="container">
      <div className="row justify-content-center">
       <div className="col-md-6">
    <form  className="mt-5"onSubmit={handleSubmit}>
    <h2 className="text-center">Edit Medicine</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      {!success ? (
        <button type="submit" style={{ backgroundColor: "#009688"}} className="btn btn-primary">
          Edit
        </button>
      ) : (
        <Link to="/pharmacist/ViewMedicine" style={{ backgroundColor: "#009688"}} className="btn btn-secondary">
          Go back to home
        </Link>
      )}

      {error && <div className="text-danger mt-3">{error}</div>}
    </form>
    </div>
      </div>
    </div>
    </Container>
    </>
  );
};

export default EditMedicineForm;
