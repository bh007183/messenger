import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { createAccountAPI, resetErrorSuccess } from "../store/userActions";
import Alerts from "../components/Alerts";

export default function CreateAccount() {
  const success = useSelector((state) => state.store.User.Success);
  const fail = useSelector((state) => state.store.User.Error);
  const dispatch = useDispatch();
  const [Login, setLogin] = useState({
    username: "",
    firstandlast: "",
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

  const submitHandler = (event) => {
    event.preventDefault();

    if (Login.password === Login.verifyPassword) {
      dispatch(createAccountAPI(Login));
    }

    setTimeout(() => {
      if (success === "") {
        dispatch(resetErrorSuccess(""));
        window.location.href = "/";
      }
      if (fail === "") {
        dispatch(resetErrorSuccess(""));
      }
    }, 3000);
  };

  return (
    <>
      <form onSubmit={submitHandler} className="formContainer">
        <br></br>
        <br></br>
        {fail || success ? <Alerts fail={fail} success={success} /> : <></>}
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
            name="firstandlast"
            value={Login.firstandlast}
            placeholder="First and Last name"
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
