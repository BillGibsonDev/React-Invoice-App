import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogOutBtn from "./LogOutBtn";

function Nav() {
  const { loggedIn } = useContext(AuthContext);
  
  return (
    <div className="nav">
      <Link to="/"><h2>Home</h2></Link>
      {loggedIn === false && (
        <>
          <Link to="/Login"><h2>Log In</h2></Link>
        </>
      )}
      {loggedIn === true && (
        <>
        <Link to="/invoice-list"><h2>Invoice Log</h2></Link>
          <Link to="/create-user"><h2>Create User</h2></Link>
          <Link to="/create-invoice"><h2>Create Invoice</h2></Link>
          
          <LogOutBtn className="logout-btn"/>
        </>
      )}
    </div>
  );
}

export default Nav;