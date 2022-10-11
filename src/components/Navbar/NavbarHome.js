import React, { useState } from "react";
import AuthLogin from "../Auth/AuthLogin";
import AuthRegister from "../Auth/AuthRegister";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo2.png";

export default function NavbarHome() {
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);

  const isRegister = (event) => { event.preventDefault(); setRegisterShow(false); setLoginShow(true); };
  const isLogin = (event) => { event.preventDefault(); setLoginShow(false); setRegisterShow(true); };

  return (
    <div> 
      <AuthLogin loginHere={isLogin} loginShow={loginShow} setLoginShow={setLoginShow}/>
      <AuthRegister registerHere={isRegister} registerShow={registerShow} setRegisterShow={setRegisterShow}/>

      <Navbar fixed="top" style={{ height: "8vh",backgroundColor:"transparant" }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ marginLeft: "10px" }}>
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <button style={{padding:"3px 25px", borderRadius:"5px",fontWeight:"bold",color:"white",backgroundColor:"transparent",border:"1px solid white"}} onClick={() => setLoginShow(true)}>
              Login
            </button>
            <button style={{margin:"10px", padding:"3px 20px", borderRadius:"5px",fontWeight:"bold", backgroundColor:"#FF5C5C",color:"white",borderColor:"none"}} onClick={() => setRegisterShow(true)}>
              Register
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}