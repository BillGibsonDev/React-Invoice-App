import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// image
import Workflow from '../workflow.jpg';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        username,
        password,
      };

      // await axios.post("http://localhost:5000/auth/login", loginData);
      await axios.post(
        "http://localhost:5000/auth/login",
        loginData
      );
      await getLoggedIn();
     
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="login-page">
      <img src={Workflow} alt=""/>
      <h3>WorkFlow</h3>
      <h3>Please Log In</h3>
      <form onSubmit={login} className="login-form">
        <label>Username: 
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        /></label>
        <label>Password: 
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        /></label>
        <button className="form-buttons" type="submit">Log in</button>
      </form>
      </div>
    </div>
  );
}

export default Login;