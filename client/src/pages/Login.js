import React, { useState, useEffect } from "react";
import "./style.css";
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {loginAccount} from "../store/userActions"
import {Redirect} from "react-router-dom"
import Alert from "../components/Alerts"
import {resetErrorSuccess} from "../store/userActions"

export default function Login() {

  const dispatch = useDispatch()
  const userState = useSelector(state => state.store.User.YourName)
  const fail = useSelector(state => state.store.User.Error)


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

 

  const handelSubmit = (event) => {
      event.preventDefault();
      dispatch(loginAccount(Login));

      setLogin({
        username: "",
        password: "",
      })
  }
  useEffect(() => {
    if(fail !== ""){
      setTimeout(() => {
        dispatch(resetErrorSuccess(""))
      }, 4000);
    }
  }, [fail])

  

  return (
    <>
    {userState !== "" ? <Redirect to="/main"/> : <></>}
    
      <form onSubmit={handelSubmit} className="formContainer">
        <br></br>
        <Alert fail={fail}/>
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
            type="password"
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
