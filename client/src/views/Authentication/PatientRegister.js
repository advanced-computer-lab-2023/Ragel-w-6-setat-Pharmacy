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
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";


const PatientRegister = () => {
  const navigate = useNavigate();
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  const toggleGenderDropdown = () => setGenderDropdownOpen(!genderDropdownOpen);  
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setGenderDropdownOpen(false);
  };

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
      console.log(e.gender + e.name)
    const patient ={name,username,email,password,dateOfBirth,gender,mobileNumber,
    emergencyContact}

    const response= await fetch('/api/user/registerPatient',{
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
        navigate('/auth/login')
        //FIXME check this is the correct syntax to navigate
        
    } }

//FIXME add the relation to as a drop down
//FIXME why are the colour dark???


  return (
    <>
      <Col lg="6" md="8">
        <Card className="">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2>Sign Up as Patient</h2>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" type="text" 
                   onChange={(e)=>setName(e.target.value)}
                   value={name}
                   required/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Username" type="text"
                   onChange={(e)=>setUsername(e.target.value)}
                   value={username}
                   required
                   />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                      value={email}
                      required

                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required

                  />
                </InputGroup>
              </FormGroup>
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

<FormGroup>
      <InputGroup>
        <Dropdown isOpen={genderDropdownOpen} toggle={toggleGenderDropdown} >
          <DropdownToggle  style={{ backgroundColor: "#009688" }} caret>{gender || 'Select Gender'}</DropdownToggle>
          <DropdownMenu right>
            <DropdownItem value="Male" active={gender === 'Male'} onClick={() => setGender('Male')}>
              <i className="ni ni-single-02" />
              <span>Male</span>
            </DropdownItem>
            <DropdownItem value="Female" active={gender === 'Female'} onClick={() => setGender('Female')}>
              <i className="ni ni-single-02" />
              <span>Female</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </InputGroup>
    </FormGroup>
            <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mobile Number"
                    type="number"
                      value={mobileNumber}
              onChange={(e)=>setMobileNumber(e.target.value)}
              required

                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center text-muted mb-4">
              <small>Emergency Contact Info </small>
            </div>
            <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Emergency Contact Name" type="text"
                  value={emergencyContact.name}
                  onChange={(e) => setEmergencyContact(prevState => ({
                      ...prevState,
                      name: e.target.value
                    }))}
                  required
                   />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Emergency contact Mobile Number"
                    type="number"
                    value={emergencyContact.mobileNumber}
          onChange={(e) => setEmergencyContact(prevState => ({
              ...prevState,
              mobileNumber: e.target.value
            }))}
          required

                  />
                </InputGroup>
              </FormGroup>
                  <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Emergency Contact Relation" type="text"
                  value={emergencyContact.relationTo}
                  onChange={(e) => setEmergencyContact(prevState => ({
                      ...prevState,
                      relationTo: e.target.value
                    }))}
                  required
       />
                </InputGroup>
              </FormGroup> 
              <Row className="my-4">
                <Col xs="12">
                  
                </Col>
              </Row>
              {!success?(
                <div className="text-center">
       <Button className="my-4" style={{ backgroundColor: "#009688" }} type="submit">Register</Button>
       </div>
     ):<Link to ="/Login">
        <div className="text-center">
     <Button style={{ backgroundColor: "#009688", }}type="submit">Login now</Button>
     </div>
     </Link>}
     
       {error && <div className="error">
      {error}    </div>}

            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};


export default PatientRegister;
