import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab"
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Alerts from "../components/Alerts"
import {Redirect} from "react-router-dom"

import {
  manageAccountAPI,
  deleteUserAPI,
  UpdateAccountAPI,
  userUpdateChangeHandler,
} from "../store/userActions";
export default function ManageAccount() {
  const dispatch = useDispatch();

  let userData = useSelector((state) => state.store.User.user);

  const success = useSelector((state) => state.store.User.Success)

  useEffect(() => {
    dispatch(manageAccountAPI());
  }, []);

  const openWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_COUDNAME,
        uploadPreset: process.env.REACT_APP_COUDPRESET,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          dispatch(
            userUpdateChangeHandler({ name: "image", value: result.info.url })
          );
        }
      }
    ).open();

  }

  

  const handleImageUpload = (event) => {
    event.preventDefault();
    openWidget();
  };
  const deleteUser = (event) => {
    dispatch(deleteUserAPI());
  };

  const handleSubmit = (event) => {
    dispatch(UpdateAccountAPI(userData));
  };

  const change = (event) => {
    dispatch(
      userUpdateChangeHandler({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };

  return (
    <div className="formWraper">
      {userData ? (
        <form onSubmit={handleSubmit}>
        <div style={{ height: "50px" }}></div>

        <div className="row">
          <div className="AlertContain">
          <Alerts success={success} />

          </div>
          <div className="editimage">
            <div
              style={{
                backgroundImage: `url(${userData.image})`,
                backgroundSize: "contain",
              }}
              className="yourImage"
            >
              <Fab
              
                color="primary"
                size="small"
                className="cloudinary"
                type="click"
                id="upload_widget"
                onClick={handleImageUpload}
              >
                <AddAPhotoIcon />
              </Fab>
            </div>
          </div>
          <div className="deleteButtonContain">
            <Button
              startIcon={<DeleteIcon />}
              size="small"
              variant="contained"
              color="secondary"
              type="click"
              onClick={deleteUser}
            >
              Destroy
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="inputContain">
            <label style={{ color: "white" }}>
              Username:
              <input
                onChange={change}
                name="username"
                value={userData.username}
                placeholder="Username"
              ></input>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="inputContain">
            <label style={{ color: "white" }}>
              Name:
              <input
                onChange={change}
                value={userData.firstandlast}
                name="firstandlast"
                placeholder="Name"
              ></input>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="inputContain">
            <label style={{ color: "white" }}>
              Email:
              <input
                onChange={change}
                value={userData.email}
                name="email"
                placeholder="Email"
              ></input>
            </label>
          </div>
        </div>

        <div className="row">
          <div className="submitChanges">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      ) : <></>}
      
    </div>
  );
}
