import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageAccountAPI, deleteUserAPI } from "../store/userActions";
export default function ManageAccount() {
  const dispatch = useDispatch();

  let userData = useSelector((state) => state.store.User.user);

  const [user, userState] = useState({
    username: userData.username,
    name: userData.name,
    connections: userData.connections,
    email: userData.email,
    image: userData.image,
  });

  useEffect(() => {
    dispatch(manageAccountAPI());
  }, []);

  var widget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_COUDNAME,
      uploadPreset: process.env.REACT_APP_COUDPRESET,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        userState({ ...user, image: result.info.url });
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
  return (
    <div className="formWraper">
      <form>
        <div style={{ height: "51px" }}></div>
        <div className="row">
          <div className="inputOne">
            <input value={user.username} placeholder="Username"></input>
          </div>
        </div>
        <div className="row">
          <div className="inputTwo">
            <input value={user.firstandlast} placeholder="Name"></input>
          </div>
        </div>
        <div className="row">
          <div className="inputThree">
            <input value={user.email} placeholder="Email"></input>
          </div>
        </div>
        <div className="row">
          <div className="editimage">
            <img src={user.image} />
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
