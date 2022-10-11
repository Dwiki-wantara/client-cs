import React from "react";
import ReactAudioPlayer from 'react-audio-player';
import NavbarAdmin from "../Navbar/NavbarAdmin"
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { Link } from "react-router-dom";
import Square from "../Timbul.module.css"
import { UserContext } from "../../context/userContext";
import { useState } from "react";
import { useContext } from "react";
import Musik from "../../assets/Musik.jpg"

function Listmusic() {

  const [state, dispatch] = useContext(UserContext);
  // const path = "http://localhost:5000/uploads/";
  
  const [song, setSong] = useState();
 
  const [currentPlay, setCurrentPlay] = useState(0);

const [showAudio, setShowAudio] = useState(false);

  const handleShowAudio = (id) => {
    if (showAudio) {
      setShowAudio(false);
      setCurrentPlay(id);
      setTimeout(() => setShowAudio(true), 500);
    } else {
      setShowAudio(true);
    }
  };

  let { data: music } = useQuery("musicsCache", async () => {
    const response = await API.get("/musics");
    return response.data.data;
  });


  return (
    <>
      <div style={{ marginTop: "8vh" }}>
        
      <div style={{textAlign:"center"}}>
          <h4 className="text-danger">Dengarkan Dan Rasakan</h4>
        </div>
       
        
        <div>
        <div style={{display: "grid", gridTemplateColumns:"repeat(6,2fr)"}} >
        {music?.map((music, index) => (
            <Link to={music.id} width={"100%"} style={{textAlign:"center",textDecoration:"none",color:"white"}} className="m-3"  >
              <div  key={index} className={Square.Square} style={{ backgroundColor:"#393535", borderRadius:"5px",height:"100%"}} onClick={handleShowAudio}>
                
                <div>
                  <img src={music?.thumbnailMusic} alt="" style={{minHeight:"200px", maxHeight:"200px",minWidth:"200px",maxWidth:"200px",marginTop:"20px", borderRadius:"3px"}} />
                </div>

                <div style={{marginTop:"5px"}}>

                  <div style={{display:"flex", textAlign:"left",paddingLeft:"20px"}}>
                    <h4 style={{textDecoration:"none", flex:"70%"}}>{music.title.length> 9 ? music.title.substring(0, 9) + "..." : music.title}</h4>
                    <p style={{flex:"30%",padding:"5px 0px 0px 5px"}}>{music.year}</p>
                  </div>

                  <div style={{textAlign:"left", paddingLeft:"20px"}}>
                    <p>{music?.artis?.name}</p>
                  </div>

                  {/* <div>
                    <ReactAudioPlayer  src={music?.attache} controls  style={{display:"flex", width:"100%", backgroundColor:"white"}}/>  
                  </div>
                   */}
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      
      </div>

      
     



    </>
  );
}

export default Listmusic;

