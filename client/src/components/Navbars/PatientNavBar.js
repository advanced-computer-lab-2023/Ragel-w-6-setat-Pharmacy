import React, { useContext, useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Media
} from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";


const PatientNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {dispatch}=useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);
  const handleLogOut = async (e) => {
    //remove user from storage
    localStorage.removeItem("user");

    //dispatch logout function
    dispatch({type:'LOGOUT'})
    window.location.href = "http://localhost:3000/auth/login";
  };

  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark"
        style={{
          backgroundColor: "#009688",
          display: "flex",
          justifyContent: "space-between",
        }}
        dark
        expand="md"
      >
        <NavbarBrand>
          {/* <img
            alt="logo"
            src={require("../../assets/img/brand/healthspace-removebg-preview.png")}
            style={{
              height: 130,
              width: 350,
            }}
          /> */}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Container fluid>
            <Nav navbar>
            

            </Nav>{" "}
          </Container>
          <Nav className="ml-auto" style={{ marginRight: "5px" }} navbar>
            <NavItem className="ml-auto">
              <NavLink className="rounded-circle text-white">
                <span className="nav-link-icon d-block">
                  <i className="ni ni-chat-round" />
                </span>
              </NavLink>
            </NavItem>
              {/* <NavItem>
                <NavLink className="rounded-circle text-white">
                  <span className="nav-link-icon d-block">
                    <i className="fa-solid fa-video"></i>
                  </span>
                </NavLink>
              </NavItem> */}
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
              <span className="nav-link-icon d-block text-white">
                  <i className="ni ni-button-power" /> 
                </span>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem href="#pablo" onClick={handleLogOut}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default PatientNavBar;