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
  import { useState , updateFormState} from "react";
  
  const PatientRegister = () => {

   
        const [formData, setFormData] = useState({
          name: "",
          username: "",
          email: "",
          password: "",
          dateOfBirth: "",
          gender: "",
          mobileNumber: "",
          emergencyContact: {
            name: "",
            mobileNumber: "",
            relationTo: "",
          },
        });
        console.log("check")

        const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
      
        const toggleGenderDropdown = () => setGenderDropdownOpen(!genderDropdownOpen);
          const [selectedGender, setSelectedGender] = useState('');

        const handleGenderSelect = (gender) => {
          setFormData((prevData) => ({
            ...prevData,
            gender,
          }));
          setSelectedGender(gender);
          setGenderDropdownOpen(false);
        };
      
        const handleInputChange = (e) => {
            const { name, value } = e.target;
          
            // For regular fields (not nested)
            if (!name.includes('.')) {
              setFormData({
                ...formData,
                [name]: value,
              });
              console.log(name, value)
            } else {
              // For nested fields
              const [nestedField, subField] = name.split('.');
              setFormData({
                ...formData,
                [nestedField]: {
                  ...formData[nestedField],
                  [subField]: value,
                },
              });
            }
          };
          
      

          const handleSubmit = async (e) => {
            e.preventDefault(); // Prevent the default form submission behavior
          
            // Now, formData contains all the user input data
            console.log("Form Data:", formData);
          
            try {
              const response = await fetch('/api/user/registerPatient', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
          
              if (!response.ok) {
                // Handle the error
                console.error('Registration failed');
                return;
              }
          
              const responseData = await response.json();
          
              // Assuming you have state variables to update the form data
              setFormData({
                name: responseData.patient.name,
                username: responseData.patient.username,
                // ... other fields
              });
          
              console.log('Registration successful', responseData);
            } catch (error) {
              console.error('Registration error', error);
            }
          };
          





  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign Up as Patient</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                  <Input
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
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
                  <Input
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                  <Input
                    placeholder="Password must constitue of 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormGroup>

              {/* Add similar code for other form groups */}
              {/* ... */}

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    inputProps={{
                      placeholder: "Date of Birth",
                    }}
                    timeFormat={true}
                    value={formData.dateOfBirth}
                    onChange={(value) =>
                      setFormData({ ...formData, dateOfBirth: value })
                    }
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <Dropdown
                    isOpen={genderDropdownOpen}
                    toggle={toggleGenderDropdown}
                  >
                    <DropdownToggle caret>
                      {selectedGender || "Select Gender"}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => handleGenderSelect("Male")}>
                        <i className="ni ni-single-02" />
                        <span>Male</span>
                      </DropdownItem>
                      <DropdownItem onClick={() => handleGenderSelect("Female")}>
                        <i className="ni ni-single-02" />
                        <span>Female</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mobile Number"
                    type="number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormGroup>
              

              {/* Emergency Contact*/}
              {/* ... */}
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
                  <Input
                    placeholder="Emergency Contact Name"
                    type="text"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleInputChange}
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
                  <Input
                    placeholder="Emergency Mobile Number"
                    type="number"
                    name="emergencyContact.mobileNumber"
                    value={formData.emergencyContact.mobileNumber}
                    onChange={handleInputChange}
                  />
                </InputGroup>

                <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Emergency Contact Relation"
                    type="text"
                    name="emergencyContact.relationTo"
                    value={formData.emergencyContact.relationTo}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit" >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};
  
  export default PatientRegister;
  