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

const Login = () => {

  const navigate = useNavigate()
  const [success, setSuccess] = useState(false);
  
  const [error, setError] = useState(null)

  const [ data,setData]=useState({
    username:"",
    password:""
  })
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const  loginUser = async(e) =>
  {
    e.preventDefault();
    const user = {username,password}
    try{
      const response= await fetch('/api/user/login',{
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
      //navigate('/auth/login') 
      //FIXME check this is the correct syntax to navigate
      //FIXME route based on user role to the correct dashboard ; swithc case
      // Navigate based on user role
      switch (json.userType) {
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
          navigate("/auth/login"); // Default route if the role is not recognized
      }
  } 
    }
    catch(error){
      console.error(error);
    }
  }

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate('/auth/forgotpassword');
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in</small>
            </div>
            <Form role="form" onSubmit={loginUser}>
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
                   placeholder="Password" type="password" 
                   onChange={(e)=>setPassword(e.target.value)}
                   value={password}
                   required/>
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
      <a
        className="text-light"
        href="#pablo"
        onClick={handleForgotPasswordClick}
      >
        <small>Forgot password?</small>
      </a>
    </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account REMOVE THIS?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
