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
import {useState, useContext} from "react";
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
  Alert
} from "reactstrap";

import { UserContext } from "../../contexts/UserContext";
import {AuthContext} from "../../contexts/AuthContext";

const Login = () => {

  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null)
  const [ data,setData]=useState({
    username:"",
    password:""
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {dispatch}=useContext(UserContext);
  
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
      console.error("Login failed", data);
      setMessage({ type: "danger", text: "Login failed. Invalid credentials" });
  }
  else{ 
    setSuccess(true)
     setError('Thank you for logging ')
     console.log("Login successful", data);
     console.log("User logged in", json.user._id.toString());

     setMessage({ type: "success", text: "Login successful" });
      //navigate('/auth/login') 
      //FIXME check this is the correct syntax to navigate
      //FIXME route based on user role to the correct dashboard ; swithc case
      // Navigate based on user role
      setUser({ _id: json.user._id.toString() });
        // save user to local storage
        localStorage.setItem('user', JSON.stringify(json.user));
        //update context
      //  dispatch({type:"LOGIN",payload:json})
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
          navigate("/auth/admin"); // Default route if the role is not recognized
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
        <Card className="green">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h4>Log in with credentials</h4>
            </div>
            {message && (
              <Alert color={message.type} className="text-center">
                {message.text}
              </Alert>
            )}
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
                   placeholder="Password" 
                   type={showPassword ? "text" : "password"}
                   onChange={(e)=>setPassword(e.target.value)}
                   value={password}
                   required/>
                    <InputGroupAddon addonType="append">
              <InputGroupText
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "ni ni-check-bold" : "ni ni-fat-remove"} />
              </InputGroupText>
            </InputGroupAddon>
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
              <Button className="my-4" style={{ backgroundColor: "#009688" }} type="submit">
                  Login
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
              {/* <small>Create new account REMOVE THIS?</small> */}
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
