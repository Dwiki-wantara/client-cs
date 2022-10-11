import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { API } from "../../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import NavbarAdmin from "../Navbar/NavbarAdmin";

function Addfilm() {
  let navigate = useNavigate();
 
  const [form, setForm] = useState({
    name: "",
    old: "",
    type_artis: "",
    start_career: "", 
  });

  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log("handle change", e.target.name);

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const addDataArtis = new FormData();

      addDataArtis.set("name", form.name);
      addDataArtis.set("old",form.old);
      addDataArtis.set("type_artis", form.type_artis);
      addDataArtis.set("start_career", form.start_career);

      const response = await API.post("/artis", addDataArtis, config);
      
      console.log(response);
      
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  });


  return (
    <>    
    <NavbarAdmin />
    <div style={{ backgroundColor: "black", marginTop: "11vh" }}>
      <div style={{marginBottom:"20px"}}>
        <h2 className="text-light col-2 d-flex justify-content-end">
          Add Artis
        </h2>
      </div>
      
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <div className="row g-1 d-flex justify-content-center">
         

          <div className="col-10 d-flex justify-content-center" style={{marginBottom:"8px"}}>
          <Form.Control type="text" name="name" id="name" onChange={handleChange} placeholder="Name" className="bg-dark text-white"/>
          </div>

          <div className="col-10 d-flex justify-content-center" style={{marginBottom:"8px"}}>
            <Form.Control type="number" placeholder="Old" name="old" onChange={handleChange} className="bg-dark text-white"/>
          </div>

          
          <div className="col-10 d-flex justify-content-center"  style={{marginBottom:"8px"}}>
            <select className="form-select bg-dark text-white" aria-label="Default select example" onChange={handleChange}  name="type_artis">
              <option value="" hidden>Singer</option>
                <option value="band">Band</option>
                <option value="band">Quran</option>
            </select>
          </div>
          
          <div className="col-10 d-flex justify-content-center" style={{marginBottom:"20px"}}>
            <Form.Control type="number" placeholder="Start a Career" name="start_career" onChange={handleChange} className="bg-dark text-white"/>
          </div>
          
          <div className="col-10 d-flex justify-content-center" style={{marginBottom:"20px"}}>
            <button class="btn btn-warning float-md-start btn-lg  d-grid gap-2 col-2 text-white fw-bold" type="submit" >
              Add Artis
            </button>
          </div>
        </div>
      </form>
    </div>
  </>
  );
}

export default Addfilm;

