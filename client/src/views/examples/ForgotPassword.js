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
import {useState} from "react";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const ForgotPassword = () => {

  const navigate = useNavigate()
  const [success, setSuccess] = useState(false);
  
  const [error, setError] = useState(null)

  
  const [username, setUsername] = useState('')

  const [email, setEmail] = useState('')

  const  sendOTP = async(e) =>
  {
    e.preventDefault();
    const password="HalaWallah123*"

    const user = {username,email,password}
    try{
      const response= await fetch('/api/user/resetPasswordOTP',{
        method:'POST',
        body: JSON.stringify(user),
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
     setError('Thank you for logging ')
      navigate('/auth/login') 
      //FIXME check this is the correct syntax to navigate
      //FIXME route based on user role to the correct dashboard ; swithc case
      // Navigate based on user role
      /* switch (json.userType) {
        case "patient":
          navigate("/patient");
          break;
        case "pharmacist":
          navigate("/pharmacist");
          break;
        case "admin":
          navigate("/admin");
          break;
        // Add other roles as needed
        default:
          navigate("/login"); // Default route if the role is not recognized
      } */
  } 
    }
    catch(error){
      console.error(error);
    }
  }



  return (
    <>
     <Container>
      <Row className="justify-content-center">
      <Col lg="5" md="7">
        <Card className="">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h4>Send OTP via Email</h4>
            </div>
            <small>Please enter your username and a valid email address</small>
            <Form role="form" onSubmit={sendOTP}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                   placeholder="Username" type="text" 
                   onChange={(e)=>setUsername(e.target.value)}
                   value={username}
                   required/>
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
                   placeholder="Email" type="text" 
                   onChange={(e)=>setEmail(e.target.value)}
                   value={email}
                   required/>
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <Button className="btn btn-success"  type="submit">
                  Send OTP to email
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
       
      </Col>
      </Row>
    </Container>
    </>
  );
};

export default ForgotPassword;
