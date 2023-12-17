import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import AdminHeader from '../../components/Headers/AdminHeader';
import { Container } from 'reactstrap';


const AddNewMedicine = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [activeIngredient, setActiveIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [medicinalUse, setMedicinalUse] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedQuantity = parseInt(quantity, 10);

    const Medicine = { name,image, price, description, activeIngredient, quantity: parsedQuantity, medicinalUse };

    const response = await fetch('/api/pharmacist/AddMedicine', {
      method: 'POST',
      body: JSON.stringify(Medicine),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess(false);
    } else {
      setSuccess(true);
      setError('Added Medicine');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      <AdminHeader />
      {/* Page content */}
     <Container>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <form className="mt-5" onSubmit={handleSubmit} encType="multipart/form-data">            
        <h2 className="text-center">Add Medicine</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            <div className="form-group">
              <label>Active Ingredient</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setActiveIngredient(e.target.value)}
                value={activeIngredient}
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                required
              />
            </div>

            <div className="form-group">
              <label>Medicinal Use</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setMedicinalUse(e.target.value)}
                value={medicinalUse}
                required
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                className="form-control-file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </div>

            {!success ? (
              <button type="submit" className="btn btn-primary btn-block"
              style={{ backgroundColor: "#009688"}}>

                Add
              </button>
            ) : (
              <Link to="/pharmacist/ViewMedicine" 
              style={{ backgroundColor: "#009688"}}
              className="btn btn-success btn-block">
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

export default AddNewMedicine;
