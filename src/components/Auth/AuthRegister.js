import React, { useContext, useState } from "react";
import { Modal, Alert,Form } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function AuthRegister({ registerShow, setRegisterShow,registerHere,}) {
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
  });

  const { fullName, email, password, gender, phone, address } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const body = JSON.stringify(form);
      const response = await API.post("/register", body, config);
  
      if (response.data.code === 200) {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );

        setMessage(alert);
        setForm({
          fullName: "",
          email: "",
          password: "",
          gender: "",
          phone: "",
          address: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
      if (error.message == "Request failed with status code 400") {
        const alertPassword = (
          <Alert variant="danger" className="py-1">
           Fields Empty
          </Alert>
        );
        setMessage(alertPassword);
      }

      if (error.response.data.code == 403) {
        const alertPassword = (
          <Alert variant="danger" className="py-1">
            Email has already!
          </Alert>
        );
        setMessage(alertPassword);
      }
    }
  });

  return (
    <Modal size="md" show={registerShow} onHide={() => setRegisterShow(false)} centered>
      <Modal.Body className="bg-Modal">
        <div className="card-auth p-4">
          <div style={{ fontSize:"30px",lineHeight:"49px",fontWeight:"700",color:"white",}} className="mb-2">
            Register
          </div>
          {message && message}
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="mt-3 form">
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="ShowPass"
                value={password}
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />

              <Form.Control className="px-3 py-2 mt-3" type="text" onChange={handleChange} value={gender} name="gender" as="select">
              <option value="" selected disabled>Gender</option>
              <option name="gender">male</option>
              <option name="gender">female</option>
              </Form.Control>
             
              <input
                type="number"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={address}
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />
            </div>
         
            <div className="d-grid gap-2 mt-3">
              <button style={{padding:"10px",backgroundColor:"#FF5C5C", color:"white",border:"none",borderRadius:"5px",fontWeight:"bold"}}>Register</button>
              <p className="warning">
                Already have an account?
                <button onClick={registerHere} style={{background:"none", border:"none",color:"blue"}}>
                  Here
                </button>
              </p>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
