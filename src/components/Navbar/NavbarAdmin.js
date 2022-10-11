
import Logo from "../../assets/logoDumbsound.png";
import  {React,useContext} from 'react'
import { Container, Navbar as NavbarComp, Nav } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from '../../context/userContext'
import { Navbar } from "react-bootstrap";
import {  Dropdown } from "react-bootstrap";
import masgan from "../../assets/large.png";
import { FaSignOutAlt,FaList,FaMusic,FaUserCircle } from "react-icons/fa";

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
      <Navbar fixed="top" style={{ height: "8vh",backgroundColor:"rgb(10, 12, 0)" }}>
        <Container>
          <Navbar.Brand as={Link} to="/admin">
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <NavbarComp.Toggle aria-controls="basic-navbar-nav"></NavbarComp.Toggle>

                  <NavbarComp.Collapse style={{paddingLeft:"1000px"}}>
                    <Dropdown>
                      <Dropdown.Toggle id="user-dropdown" variant="white">
                        <img src={masgan} alt="Masgan" width={40} className="rounded-pill" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="dark" style={{alignItem:"left", marginTop:"7px"}}>
                        <Dropdown.Item as={Link} to="/admin/addmusic">
                          <FaMusic className="text-danger me-2" ></FaMusic>
                          <span>Add Music</span>
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/admin/addartis">
                          <FaUserCircle className="text-danger me-2" ></FaUserCircle>
                          <span>Add Artis</span>
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/admin/music">
                          <FaList className="text-danger me-2" ></FaList>
                          <span>List Music</span>
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