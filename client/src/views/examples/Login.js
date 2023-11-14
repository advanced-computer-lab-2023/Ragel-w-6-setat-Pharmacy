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

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";



const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const handleLogin = async () => {
    try {
      const response = await fetch('/api/user/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, redirect or perform actions as needed
        console.log("Login successful", data);
        setMessage({ type: "success", text: "Login successful" });
        switch (data.userType) {
          case "pharmacist":
            navigate("/pharmacist");
            break;
          case "patient":
            navigate("/patient");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            // Default redirection or handle unknown user type
            navigate("/default/dashboard");
        }

      } else {
        // Login failed, handle errors
        console.error("Login failed", data);
        setMessage({ type: "danger", text: "Login failed. Invalid credentials" });

      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage({ type: "danger", text: "Internal server error" });

    }
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-light shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-dark mb-4">
              <small>Sign in with credentials</small>
            </div>
            {/* Display messages */}
            {message && (
              <Alert color={message.type} className="text-center">
                {message.text}
              </Alert>
            )}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83 text-primary" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open text-primary" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label text-muted"
                  htmlFor=" customCheckLogin"
                >
                  Remember me
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="info" type="button" onClick={handleLogin}>
                  Login
                </Button>
              </div>
              <label>You dont have an Account?</label>
              <div className="text-center">
                <Button className="my-4"
                  onClick={() => navigate("/auth/register")}
                  color="info" type="button">
                  Sign Up
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-dark"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-dark"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
