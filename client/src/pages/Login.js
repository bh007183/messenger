import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import {Link} from "react-router-dom"

export default function Login() {
  const [Login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setLogin({
      ...Login,
      [name]: value,
    });
  };

  return (
    <>
      <form className="formContainer">
        <br></br>
        <br></br>
        <div className="inputContainer">
          <input
            onChange={handleChange}
            name="username"
            value={Login.username}
            placeholder="Username"
          ></input>
        </div>
        <br></br>
        <br></br>
        <div className="inputContainer">
          <input
            onChange={handleChange}
            name="password"
            value={Login.password}
            placeholder="Password"
          ></input>
        </div>
        <br></br>
        <br></br>
        <div className="inputContainer">
          <button>Login</button>
        </div>
        <br></br>
        <br></br>
        <Link to="/CreateAccount">Create Account</Link>
      </form>
    </>
  );
}
