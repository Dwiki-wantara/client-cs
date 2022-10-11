import React, { useEffect, useState, useContext, useRef } from "react";
import { API } from "../../config/api";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import clip from "../../assets/clip.png";
import { UserContext } from "../../context/userContext";
import { Form, Button } from "react-bootstrap";
import NavbarUser from "../Navbar/NavbarUser"

function Payment() {

  const [state] = useContext(UserContext);
  console.log(state);

  let navigate = useNavigate();

  const [previewSrc, setPreviewSrc] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-JmIrGXGXbBJstKvh";

    let scriptTag = document.createElement("script");

    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        },
      };

      const response = await API.post("/transaction", config);
      console.log(response);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
         
        },
        onPending: function (result) {
         
        },
        onError: function (result) {
         
        },
        onClose: function () {
        
          alert("Not Payment");
        },
      });
    } catch (error) {
      console.log(error);
    
    }
  });

  const onChangeFiles = (e) => {
    let fileInfo = e.target.files[0];
    setFile(fileInfo);
    let reader = new FileReader();

    if (e.target.files.length === 0) {
      return;
    }

    reader.onloadend = (e) => {
      setPreviewSrc([reader.result]);
    };

    reader.readAsDataURL(fileInfo);
  };

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };
  return (
  
    <div className="payment-container">
        <NavbarUser />
      <div className="payment-details">
        <div className="payment-desc">
        <h1 className="fs-2 fw-bold mb-5">Premium</h1>
        <p className="pPayment">
          Bayar Sekarang dan nikmati streaming musik yang kekinian dari{" "}
          <span className="fw-bold" style={{color:"#EE4622"}}>DUMB</span>
          <span className="fw-bold">SOUND</span>
        </p>

        <div>
          <p className="text-danger fw-bold">
          <span className="fw-bold" style={{color:"#EE4622"}}>DUMB</span>
          <span className="text-white fw-bold">SOUND</span> <span className="text-light">: 0423115s</span>{" "}
          </p>
        </div>

        <form style={{marginBottom:"10px"}}>
            <div  >
              <input style={{width:"50%",border:"1px solid white",padding:"12px 5px", borderRadius:"10px"}}
                type="input"
                placeholder="Input Your Code"
                name="email"
                className="bg-dark text-white"
              />
            </div>
          </form>

        <div className="form-payment">
        <button type="button" onClick={() => onBtnClick()} className="btn-light border-light border-3 bg-dark" style={{ width: "100%", height: "50px", fontSize: "20px",marginBottom:"10px"}}>
            Attach proof of transfer{" "}
          <div style={{ float: "right", display: "inline", fontSize: "20px", }}>
            <img src={clip} alt="" />
          </div>
        </button>
      <input onChange={(e) => onChangeFiles(e)} type="file" name="file" ref={inputFileRef} style={{ display: "none" }}/>
      {previewSrc && (
        <img src={previewSrc} alt="" className="preview-src" style={{marginBottom:"20px",minWidth:"150px",maxWidth:"150px",minHeight:"180px",maxHeight:"180px"}} />
        )}
      <button onClick={(e) => handleBuy.mutate(e)} type="submit" style={{  fontSize: "16px", backgroundColor:"#F58033", color:"white", width:"100%", padding:"10px 0px"}}>
        Send
      </button>
      </div>

        
          <form>
           
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
