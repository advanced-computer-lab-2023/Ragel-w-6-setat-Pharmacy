/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
  import ReactDatetime from "react-datetime";
    import { useState } from "react";
  
  const PharmacistRegister = () => {
    const navigate = useNavigate();
    const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
   // const [selectedGender, setSelectedGender] = useState('');
  
    // const toggleGenderDropdown = () => setGenderDropdownOpen(!genderDropdownOpen);  
    // const handleGenderSelect = (gender) => {
    //   setSelectedGender(gender);
    //   setGenderDropdownOpen(false);
    // };
//FIXME ensure data entered is validated like in doctor reg, email pass etc
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[dateOfBirth, setDateOfBirth]=useState('')
    const [hourlyRate, setHourlyRate] = useState('')
    const [affiliation, setAffiliation] = useState('')
    const [educationalBackground, setEducationalBackground] = useState('')
    const [ID, setID] = useState()
    const [pharmacyDegree, setPharmacyDegree] = useState()
    const [workingLicense, setWorkingLicense] = useState()
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null)
   
  
    const handleSubmit=async (e)=>{
      e.preventDefault()
        console.log(e.gender + e.name)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("hourlyRate", hourlyRate);
        formData.append("affiliation", affiliation);
        formData.append("educationalBackground", educationalBackground);
        formData.append("ID", ID);
        formData.append("workingLicense", workingLicense);
        formData.append("pharmacyDegree", pharmacyDegree);

    
      
  
      const response= await fetch('/api/user/registerPharmacist',{
          method:'POST',
          body: formData,
          
      })
      const json= await response.json()
  
      if (!response.ok){
          setError(json.error + " "+ pharmacyDegree)
          setSuccess(false)
      }
      else{ 
          setSuccess(true)
         setError('Thank you for registering ')
          navigate('/auth/login')
          //FIXME check this is the correct syntax to navigate
          
      } }

      
    return (
        <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card className="bg-secondary shadow border-0">
            <CardBody>
              <form className="mt-5" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 className="text-center">Sign Up as Pharmacist</h2>

  
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
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </div>
  
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
  
              <div className="form-group">
                <label>password</label>
                <input
                  type="Password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <FormGroup>
<InputGroup className="input-group-alternative">
  <InputGroupAddon addonType="prepend">
    <InputGroupText>
      <i className="ni ni-calendar-grid-58" />
    </InputGroupText>
  </InputGroupAddon>
  <ReactDatetime
    inputProps={{
      placeholder: 'Date of Birth',
      required: true,
    }}
    value={dateOfBirth}
    onChange={(value) => setDateOfBirth(value)}
    timeFormat={true}
  />
</InputGroup>
</FormGroup>
  
              <div className="form-group">
                <label>Hourly Rate</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setHourlyRate(e.target.value)}
                  value={hourlyRate}
                  required
                />
              </div>
  
              <div className="form-group">
                <label>Affiliation</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setAffiliation(e.target.value)}
                  value={affiliation}
                  required
                />
              </div>
              <div className="form-group">
                <label>Educational Background:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setEducationalBackground(e.target.value)}
                  value={educationalBackground}
                  required
                />
              </div>
              <div className="form-group">
          <label>ID:</label>
          <input
              type="file"
              className="form-control-file"
              onChange={(e) => setID(e.target.files[0])}
              
          />
      </div>
        
      <div className="form-group">
          <label>Pharmacy Degree:</label>
          <input
              type="file"
              className="form-control-file"
              onChange={(e) => setPharmacyDegree(e.target.files[0])}
          />
      </div>
      <div className="form-group">
          <label>Working License:</label>
          <input
              type="file"
              className="form-control-file"
              onChange={(e) => setWorkingLicense(e.target.files[0])}
          />
      </div>
      {!success?(
         <Button type="submit">Register</Button>
       ):<Link to ="/Login">
       <Button type="submit">Login now</Button></Link>}
  
       {error && <div className="error">
         {error}    </div>}
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
    );
  };

  
  export default PharmacistRegister;