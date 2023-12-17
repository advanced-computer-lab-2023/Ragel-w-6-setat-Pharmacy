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
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { useState } from "react";
import AdminHeader from "components/Headers/AdminHeader.js";

const UserHeader = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h2 className="display-2 text-white">Welcome Back!</h2>
              <p className="text-white mt-0 mb-5">
                This is your home page. You can see all your account's details.
                You can chat with our pharmacists if you need help with your prescription.
                Don't hesitate to ask !
              </p>
              <Button className="btn btn-success"
                      style={{ background: "#009688" }}
                      onClick={toggle}>
                Change password
              </Button>
            </Col>
          </Row>
        </Container>

        {/* Change Password Modal */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Change Password</ModalHeader>
          <ModalBody>
            <ChangePassword closeModal={toggle} />
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default UserHeader;
const ChangePassword = ({closeModal} ) => {
  /* const [admins, setAdmins] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('/api/admin/getAdmins');
      const json = await response.json(); // array of objects where each represents an admin
      console.log(json);
      if (response.ok) {
        setAdmins(json);
      }
    };

    fetchAdmins();
  }, []); // empty array means it will only run once */
    const [username, setUsername] = useState('');
    const [newPassword, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const admin = { username, newPassword };
  
      const response = await fetch('/api/patient/changePatientPassword', {
        method: 'POST',
        body: JSON.stringify(admin),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.error);
        setSuccess(false);
      } else {
        setUsername('');
        setPassword('');
        setError(null);
        setSuccess(true);
      }
      closeModal();
    };
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" 
        style={{ background: "#009688" }}
        color="success">
          Change Password
        </Button>
        {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">Password changed successfully!</div>
        )}
      </form>
    );
};