import React, { useContext, useState } from "react";
import avatar from "../../assets/profileUser.png";
import name from "../../assets/name.png";
import email from "../../assets/email.png";
import status from "../../assets/status.png";
import gender from "../../assets/gender.png";
import phone from "../../assets/phone.png";
import address from "../../assets/address.png";
import { UserContext } from "../../context/userContext";
import NavbarUser from "../Navbar/NavbarUser"
import { API } from "../../config/api";
import { useQuery } from "react-query";

function Profile() {
  let { data: transactions } = useQuery("cacheTransactions", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  const [state] = useContext(UserContext);

  console.log(state);

  return (
    <div className="profile-container">
      <NavbarUser />
      <div className="profile-card">
        <div className="profile-desc">
          <div className="profile-data">
            <h2>Personal Info</h2>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <img src={name} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {state.user.fullName}
              </span>
              <span>Fullname</span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <img src={email} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {state.user.email}
              </span>
              <span>Email</span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <img src={status} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {state.user.subscribe
                  ? "Active"
                  : "Not Active"}
              </span>
              <span>Status</span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <img src={gender} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>Male</span>
              <span>Gender</span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <img src={phone} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {state.user.phone}
              </span>
              <span>Mobile Phone</span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <img src={address} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {state.user.address}
              </span>
              <span>Address</span>
            </div>
          </div>
        </div>
        <div className="profile-img">
          <img src={avatar} alt="avatar" className="profile-avatar" style={{minWidth:"415px"}}/>
          <button className="profile-button">Change Photo Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
