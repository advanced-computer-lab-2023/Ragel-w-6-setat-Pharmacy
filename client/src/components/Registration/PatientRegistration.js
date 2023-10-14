import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const PatientRegistrationForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    mobileNumber: '',
    relationTo: ''
  })
  const [success, setSuccess] = useState(false);

  //const [emergencyContactMobile, setEmergencyContactMobile] = useState('')
  //const [emergencyContactRelation, setEmergencyContactRelation] = useState('')
  const [error, setError] = useState(null)
 

  const handleSubmit=async (e)=>{
    e.preventDefault()

    const patient ={name,username,email,password,dateOfBirth,gender,mobileNumber,
    emergencyContact}

    const response= await fetch('/api/patient/',{
        method:'POST',
        body: JSON.stringify(patient),
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
       setError('Thank you for registering ')
        
        
    }
  }
  return(
    <form className="RegistrationContainer" onSubmit={handleSubmit}>
         <h2>Patient Registration Form</h2>

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
          <label>Gender </label>
          <select
            name="gender"
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            required
          >
            <option value=''> Select an option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mobile Number </label>
          <input
            type="number"
            // id="mobileNumber"
            // name="mobileNumber"
            value={mobileNumber}
            onChange={(e)=>setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label >Emergency Contact Name </label>
          <input
            type="text"
            // id="emergencyContactName"
            // name="emergencyContact.name"
            value={emergencyContact.name}
            onChange={(e) => setEmergencyContact(prevState => ({
                ...prevState,
                name: e.target.value
              }))}
            required
          />
        </div>
        <div className="form-group">
          <label>Emergency Contact Mobile Number </label>
          <input
            type="number"
            // id="emergencyContactMobile"
            // name="emergencyContact.mobile_number"
            value={emergencyContact.mobileNumber}
            onChange={(e) => setEmergencyContact(prevState => ({
                ...prevState,
                mobileNumber: e.target.value
              }))}
            required
          />
        </div>
        <div className="form-group">
          <label >Relation to Emergency Contact </label>
          <input
            type="text"
            // id="emergencyContactRelation"
            // name="emergencyContact.relation_to"
            value={emergencyContact.relationTo}
            onChange={(e) => setEmergencyContact(prevState => ({
                ...prevState,
                relationTo: e.target.value
              }))}
            required
          />
        </div>
       {!success?(
         <button type="submit">Register</button>
       ):<Link to ="/Login">
       <button type="submit">Login now</button></Link>}
       
         {error && <div className="error">
        {error}    </div>}
    </form>
  )
}
export default PatientRegistrationForm;


