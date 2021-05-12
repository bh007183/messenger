import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {createAccountAPI} from "../store/userActions"

export default function CreateAccount() {
  const dispatch = useDispatch()
  const [Login, setLogin] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    email: "",
  });

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setLogin({
      ...Login,
      [name]: value,
    });
  };

  const submitHandler = (event) =>{

      event.preventDefault()
      
      if(Login.password === Login.verifyPassword){
        dispatch(createAccountAPI(Login))

      }
      
  }

  return (
    <>
      <form onSubmit={submitHandler} className="formContainer">
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
          <input
            onChange={handleChange}
            name="verifyPassword"
            value={Login.verifyPassword}
            placeholder="Verify Password"
          ></input>
        </div>
        <br></br>
        <br></br>
        <div className="inputContainer">
          <input
            onChange={handleChange}
            name="email"
            value={Login.email}
            placeholder="Email"
          ></input>
        </div>
        <br></br>
        <br></br>
        <div className="inputContainer">
          <button type="submit">CreateAccount</button>
        </div>
        <br></br>
        <br></br>
      </form>
    </>
  );
}
