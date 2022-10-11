
import Logo from "../../assets/logoDumbsound.png";
import  {React,useContext} from 'react'
import { Container, Navbar as NavbarComp, Nav } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from '../../context/userContext'
import { Navbar } from "react-bootstrap";
import {  Dropdown } from "react-bootstrap";
import masgan from "../../assets/masgan.png";
import {  FaMoneyBillAlt, FaSignOutAlt } from "react-icons/fa";

export default function NavbarHome() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <div> 
    <Navbar fixed="top" style={{ height: "8vh",backgroundColor:"transparant" }}>
      <Container>
        <Navbar.Brand as={Link} to="/user" style={{ marginLeft: "10px" }}>
          <img src={Logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
        <NavbarComp.Collapse style={{paddingLeft:"400px"}}>
                  <Dropdown>
                    <Dropdown.Toggle id="user-dropdown" variant="white" style={{ marginLeft: "600px" }}>
                      <img src={masgan} alt="Masgan" width={40} className="rounded-pill" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark" style={{alignItem:"left", marginTop:"7px",marginLeft: "600px"}}>
                      <Dropdown.Item as={Link} to="/user/payment">
                        <FaMoneyBillAlt className="text-danger me-2" />{" "}
                        <span>Pay</span>
                      </Dropdown.Item>

                      <Dropdown.Item onClick={logout} >
                        <FaSignOutAlt className="text-danger me-2" />
                        <span>Logout</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </NavbarComp.Collapse>
      </Container>
    </Navbar>
  </div>
  );
};


