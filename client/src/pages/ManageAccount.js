import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageAccountAPI, deleteUserAPI, UpdateAccountAPI, userUpdateChangeHandler } from "../store/userActions";
export default function ManageAccount() {
  const dispatch = useDispatch();

  let userData = useSelector((state) => state.store.User.user);

  const [user, setUserState] = useState({
    username: userData.username,
    name: userData.name,
    connections: userData.connections,
    email: userData.email,
    image: userData.image,
  });

  useEffect(() => {
    dispatch(manageAccountAPI());
    if(userData !== {}){
      setUserState({
        username: userData.username,
        name: userData.name,
        connections: userData.connections,
        email: userData.email,
        image: userData.image,
        })

    }
    
  }, []);

  var widget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_COUDNAME,
      uploadPreset: process.env.REACT_APP_COUDPRESET,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        // setUserState({ ...user, image: result.info.url });
        dispatch(userUpdateChangeHandler({name: "image", value: result.info.url}))
      }
    }
  );

  const handleImageUpload = (event) => {
    event.preventDefault();
    widget.open();
  };
  const deleteUser = (event) => {
    dispatch(deleteUserAPI());
  };

  const handleSubmit = (event) => {
    dispatch(UpdateAccountAPI(userData))
  }

  const change = (event) => {

    dispatch(userUpdateChangeHandler({name: event.target.name, value: event.target.value}))

  }



  return (
    <div className="formWraper">
      <form onSubmit={handleSubmit}>
        <div style={{ height: "51px" }}></div>
        <div className="row">
          <div className="inputOne">
            <input onChange={change} name="username" value={userData.username} placeholder="Username"></input>
          </div>
        </div>
        <div className="row">
          <div className="inputTwo">
            <input onChange={change} value={userData.firstandlast} name="firstandlast" placeholder="Name"></input>
          </div>
        </div>
        <div className="row">
          <div className="inputThree">
            <input onChange={change} value={userData.email} name="email" placeholder="Email"></input>
          </div>
        </div>
        <div className="row">
          <div className="editimage">
            <img src={userData.image} />
          </div>
        </div>
        <div className="row">
          <div className="cloudinary">
            <button type="click" id="upload_widget" onClick={handleImageUpload}>
              Add/Change Photo
            </button>
          </div>
        </div>
        <div className="row">
          <div className="submitChanges">
            <button type="submit" >
              Submit
            </button>
          </div>
        </div>
      </form>
      <button type="click" onClick={deleteUser}>
        Delete Account
      </button>
    </div>
  );
}
