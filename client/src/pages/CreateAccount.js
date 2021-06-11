import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { createAccountAPI, resetErrorSuccess, setError } from "../store/userActions";
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
    image: ""
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
    }else{
      dispatch(setError({data: "Passwords Do Not Match"}))
    }

    setLogin({
      username: "",
    firstandlast: "",
    password: "",
    verifyPassword: "",
    email: "",
    image: ""
    })
  };

  useEffect(() => {
    setTimeout(() => {
      if (success !== "") {
        dispatch(resetErrorSuccess(""));
        window.location.href = "/";
      }
      if (fail !== "") {
        dispatch(resetErrorSuccess(""));
      }
    }, 3000);
  }, [fail, success])

  const openWidget = () => {
    window.cloudinary.createUploadWidget({
      cloudName: process.env.REACT_APP_COUDNAME,
        uploadPreset: process.env.REACT_APP_COUDPRESET}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          setLogin({ ...Login, image: result.info.url })
        }
      }
    ).open()

  }

  
  
  const handleImageUpload = (event) => {
    event.preventDefault()
    openWidget()
  }
 
  

  return (
    <>
      <form onSubmit={submitHandler} className="formContainer">
      
         <Alerts fail={fail} success={success} />
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
            type="password"
            name="password"
            value={Login.password}
            placeholder="Password"
          ></input>
        </div>
        <br></br>
        <br></br>
        <div className="inputContainer">
          <input
          type="password"
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
        <button type="click" id="upload_widget" onClick={handleImageUpload} >Add Photo</button>
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
