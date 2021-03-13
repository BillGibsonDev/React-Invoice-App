import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

 

  async function logOut() {
    // await axios.get("http://localhost:5000/auth/logout");
    await axios.get(
        "http://localhost:5000/auth/logout"
    );
    await getLoggedIn();
    
  }

  return <button onClick={logOut} className="logout0btn">Log out</button>;
}

export default LogOutBtn;