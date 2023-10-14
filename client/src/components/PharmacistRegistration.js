import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const PharmacistRegistrationForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [educationalBackground, setEducationalBackground] = useState('')
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null)
 

  const handleSubmit=async (e)=>{
    e.preventDefault()

    const pharmacist ={name,username,email,password,dateOfBirth,hourlyRate,affiliation,
        educationalBackground}

    const response= await fetch('/api/pharmacist/createPharmacistRequest',{
        method:'POST',
        body: JSON.stringify(pharmacist),
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
       setError('Thank you for registering! Your request is being processed')
        
        
    }
  }
  return(
    <form className="RegistrationContainer" onSubmit={handleSubmit}>
         <h2>Pharmacist Registration Form</h2>

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
          <label >Username </label>
          <input
            type="text"
            // id="username"
            // name="username"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            required
          />
        </div>

        <div className="form-group">
          <label>Email </label>
          <input
            type="email"
            // id="email"
            // name="email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label >Password </label>
          <input
            type="password"
            // id="password"
            // name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label >Date of Birth </label>
          <input
            type="date"
            // id="dateOfBirth"
            // name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e)=>setDateOfBirth(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>HourlyRate </label>
          <input
            type="number"
            // id="mobileNumber"
            // name="mobileNumber"
            value={hourlyRate}
            onChange={(e)=>setHourlyRate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label >Affiliation(Hospital)</label>
          <input
            type="text"
            // id="emergencyContactName"
            // name="emergencyContact.name"
            value={affiliation}
            onChange={(e)=>setAffiliation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label >Educational Background </label>
          <input
            type="text"
            // id="emergencyContactName"
            // name="emergencyContact.name"
            value={educationalBackground}
            onChange={(e)=>setEducationalBackground(e.target.value)}
            required
          />
        </div>
       
        
       {!success?(
         <button type="submit">Register</button>
       ):<Link to ="/Login">
       <button type="submit">Go back to home</button></Link>}
       
         {error && <div className="error">
        {error}    </div>}
    </form>
  )
}
export default PharmacistRegistrationForm;
