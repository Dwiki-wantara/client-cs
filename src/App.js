import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";

import Auth from "./pages/Auth/Auth";

import User from "./pages/User/UserHome";
import UserListMusic from "./components/Body/PlayListUser";
import ProfileUser from "./components/User/Profile";
import Payment from "./components/User/Payment";
import UserDetail from "./components/Body/UserDetail";

import Admin from "./pages/Admin/AdminHome";
import AdminListMusic from "./components/Admin/AdminListMusic"
import AdminAddMusic from "./components/Admin/AdminAddMusic";
import AdminAddArtis from "./components/Admin/AdminAddArtis";
import DetailAdmin from "./components/Admin/AdminDetail";
// import AdminAddAudio from "./components/Admin/AdminAddAudio";

import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate("/admin");
      } else if (state.user.role === "user") {
        navigate("/user");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("ini response:", response);

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
    console.log("user context", state);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route path="/user" element={<User />} />
        <Route path="/user/music" element={<UserListMusic />} />
        <Route path="/user/profile" element={<ProfileUser />} />
        <Route path="/user/payment" element={<Payment />} />
        <Route path="/user/detail/:id" element={<UserDetail />} />
      
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/music" element={<AdminListMusic />} />
        {/* <Route path="/admin/addaudio" element={<AdminAddAudio />} /> */}
        <Route path="/admin/addmusic" element={<AdminAddMusic />} />
        <Route path="/admin/addartis" element={<AdminAddArtis />} />
        <Route path="/admin/detail/:id" element={<DetailAdmin />} />
  
      </Routes>
    </>
  );
}

export default App;
