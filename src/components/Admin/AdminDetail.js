import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import NavbarAdmin from "../Navbar/NavbarAdmin";

function AdminDetail() {
  let { id } = useParams();
  let { data: film } = useQuery("productCache", async () => {
    const response = await API.get("/film/" + id);
    return response.data.data;
  });

  return (
    <>
      <NavbarAdmin />
    <div className="d-flex justify-content-center" style={{padding:"90px 0px 5px 0px", backgroundColor:"rgb(0, 0, 0)"}}>

      <iframe  width="1000" height="500" src={film?.linkFilm} title="video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

      <div className="detail-bot bg-dark" style={{baground:"white"}}>
        <div className="detail-desc "  style={{marginLeft:"220px", width:"600px"}}>
          <div className="" >
            <img src={film?.thumbnailFilm} style={{minWidth:"200px",maxWidth:"200px", minHeight:"300px",maxHeight:"300px"}}/>
          </div>
          <div className="m-2">
            <h2>{film?.title}</h2>
            <div className="d-flex text-muted">
              <p style={{ padding: "3px" }}>{film?.year} </p>
              <p className="ms-3 txt-mtd">{film?.category?.name}</p>
            </div>
            <p className="" style={{ textAlign: "justify", width: "80%"}}>
              {film?.desc}
            </p>
          </div>
        </div>

        <div>
            <img style={{minWidth:"400px",maxWidth:"400px", minHeight:"250px",maxHeight:"250px"}}  src={film?.thumbnailFilm}></img>
            <p>{film?.title} : episode 1 </p>
        </div>
       
      </div>
      
    </>
  );
}

export default AdminDetail;
