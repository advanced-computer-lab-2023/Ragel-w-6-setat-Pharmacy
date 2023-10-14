import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const AddNewMedicine = () => {
  const [name, setName] = useState('')
  //const [image, SetImage] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [activeIngredient, setActiveIngredient] = useState('')
  const [quantity, setQuantity] = useState('')
  const [medicinalUse, setMedicinalUse] = useState('')
  //const [totalSales, settotalSales] = useState('')
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(null)
 

  const handleSubmit=async (e)=>{
    e.preventDefault()

    const Medicine ={name, price, description, activeIngredient, quantity, medicinalUse}

    const response= await fetch('/api/pharmacist/AddMedicine',{
        method:'POST',
        body: JSON.stringify(Medicine),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const json= await response.json()

    if (!response.ok){
        setError(json.error)
        setSuccess(false)
    }
    else{
        setSuccess(true)
       setError('Added Medicine')
        
        
    }
  }
  return(
    <form className="RegistrationContainer" onSubmit={handleSubmit}>
         <h2>Add Medicine</h2>

         <div className="form-group">
          <label>Name </label>
          <input
            type="text"
            // id="name"
            // name="name"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label >Price </label>
          <input
            type="Number"
            // id="username"
            // name="username"
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
            required
          />
        </div>

        <div className="form-group">
          <label>Description </label>
          <input
            type="text"
            // id="email"
            // name="email"
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
            required
          />
        </div>
        <div className="form-group">
          <label >Active Ingredient </label>
          <input
            type="text"
            // id="password"
            // name="password"
            value={activeIngredient}
            onChange={(e)=>setActiveIngredient(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label >Quantity </label>
          <input
            type="Number"
            // id="dateOfBirth"
            // name="dateOfBirth"
            value={quantity}
            onChange={(e)=>setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Medicinal Use </label>
          <input
            type="Text"
            // id="mobileNumber"
            // name="mobileNumber"
            value={medicinalUse}
            onChange={(e)=>setMedicinalUse(e.target.value)}
            required
          />
        </div>
       

       
        
       {!success?(
         <button type="Add">Add</button>
       ):<Link to ="/Pharmacist">
       <button type="submit">Go back to home</button></Link>}
       
         {error && <div className="error">
        {error}    </div>}
    </form>
  )
}
export default AddNewMedicine;
