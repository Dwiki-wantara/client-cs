import React from "react";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { Link } from "react-router-dom";
import Square from "../Timbul.module.css"
import PlaylistLoggedIn from "./UserPlayList"
// import UserPlayList from "./UserPlayList"

function Listfilm() {

  let { data: film } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });


  return (
    <>

      <div style={{ marginTop: "5vh" }}>

        <div style={{textAlign:"center"}}>
          <h4 className="text-danger">Dengarkan Dan Rasakan</h4>
        </div>
       
        
        <div>
        <div style={{display: "grid", gridTemplateColumns:"repeat(6,2fr)"}} >
        {film?.map((film, index) => (
            <Link to={`/user/detail/` + film.id} width={"100%"} style={{textAlign:"center",textDecoration:"none",color:"white"}} className="m-3"  >
              <div  key={index} className={Square.Square} style={{ backgroundColor:"#393535", borderRadius:"5px",height:"100%"}}>
                <div>
                <img src={music?.thumbnailMusic} alt="" style={{minHeight:"200px", maxHeight:"200px",minWidth:"180px",maxWidth:"180px",marginTop:"10px"}} />
                </div>
                <div style={{marginTop:"5px"}}>
                  <div style={{display:"flex", textAlign:"left",paddingLeft:"20px"}}>
                    <h4 style={{textDecoration:"none", flex:"70%"}}>{film.title.length> 9
                  ? film.title.substring(0, 9) + "..."
                  : film.title}</h4>
                    <p style={{flex:"30%",padding:"5px 0px 0px 5px"}}>{film.year}</p>
                  </div>
                  <div style={{textAlign:"left", paddingLeft:"20px"}}>
                  <p >{film?.category?.name}</p>
                  </div>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
        
      </div>

      {/* <div className="main-body-wrapper">
        <UserPlayList />
      </div> */}

      {/* <div className="main-body-wrapper">
        <PlaylistLoggedIn />
      </div> */}

<>
        <ReactJkMusicPlayer
          getAudioInstance={(instance) => {
            this.audioInstance = instance
          }}
        />
        <button onClick={() => this.audioInstance.play()}>play</button>
        <button onClick={() => this.audioInstance.pause()}>pause</button>
        <button onClick={() => this.audioInstance.load()}>reload</button>
        <button onClick={() => this.audioInstance.currentTime = 40}>
          change current play time
        </button>
        <button onClick={() => this.audioInstance.playbackRate = 2}>
          change play back rate
        </button>
        <button onClick={() => this.audioInstance.volume = 0.2}>
          change volume
        </button>
        <button onClick={() => this.audioInstance.destroy()}>
          destroy player
        </button>
        <button onClick={this.audio.togglePlay}>toggle play</button>
        <button onClick={this.audio.clear}>clear audio lists</button>
        <button onClick={this.audio.playNext}>play next</button>
        <button onClick={this.audio.playPrev}>play prev</button>
        <button onClick={() => this.audio.playByIndex(1)}>play by index</button>
        <button onClick={() => this.audio.updatePlayIndex(1)}>
          update play index
        </button>
      </>
      
    </>
  );
}

export default Listfilm;
