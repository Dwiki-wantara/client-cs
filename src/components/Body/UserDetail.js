import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import ReactAudioPlayer from "react-audio-player";


function AdminDetail() {
  let { id } = useParams();
  const path = "http://localhost:5000/uploads/";
  let { data: music } = useQuery("productCache", async () => {
    const response = await API.get("/musics/" + id);
    return response.data.data;
  });

  return (
    <div>
        {music?.map((music, index) => (
        <ReactAudioPlayer  src={path + music.attache} controls  style={{display:"flex", width:"1500px",margin:"20px 0px 20px 80px"}}/>  
          ))}
    </div>
  );
}

export default AdminDetail;
