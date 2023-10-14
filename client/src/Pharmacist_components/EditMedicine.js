import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const EditMedicineForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Medicine ={name, price, description}

      const response = await fetch('/api/pharmacist/editMedicine', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Medicine),
      })
      const json = await response.json();


      if (!response.ok) {
       // onEdit(updatedMedicine); // Call the parent component's callback with the updated medicine
       setError(json.error)
        setSuccess(false)
      } else {
        setSuccess(true)
        setError('Edited Medicine')
      }
    }
  ;

  return (
    <form onSubmit={handleSubmit}>
       <div className="form-group">
        <label >Name:</label>
        <input
          type="text"
          //id="description"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label >Description:</label>
        <input
          type="text"
         // id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
         // id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      {!success?(
         <button type="Add">Edit</button>
       ):<Link to ="/Pharmacist">
       <button type="submit">Go back to home</button></Link>}
       
         {error && <div className="error">
        {error}    </div>}
    </form>
  );
};

export default EditMedicineForm;
