import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {loginAccount} from "../store/userActions"
import {Redirect} from "react-router-dom"

export default function Login() {

  const dispatch = useDispatch()
  const userState = useSelector(state => state.store.User.YourName)


  const [Login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

console.log(event.target.name)
    setLogin({
      ...Login,
      [name]: value,
    });
  };

 

  const handelSubmit = (event) => {
      event.preventDefault();
      dispatch(loginAccount(Login));
      
     


  }

  

  return (
    <>
    {userState !== "" ? <Redirect to="/main"/> : <></>}
      <form onSubmit={handelSubmit} className="formContainer">
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
          <button type="submit">Login</button>
        </div>
        <br></br>
        <br></br>
        <Link to="/CreateAccount">Create Account</Link>
      </form>
    </>
  );
}
