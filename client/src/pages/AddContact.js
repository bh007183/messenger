import React, { useState} from "react";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import {
  findFriends,
  addFriends,
  resetErrorSuccess,
} from "../store/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts";

export default function AddContact() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.store.User.PossibleFriends);
  const success = useSelector((state) => state.store.User.Success);
  const fail = useSelector((state) => state.store.User.Error);

  const [findFriend, setFindFriend] = useState({
    firstName: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setFindFriend({
      ...findFriend,
      [name]: value,
    });
  };
  const handleSearch = () => {
    dispatch(findFriends(findFriend.firstName));
  };

  const AddFriend = (event) => {
    dispatch(addFriends({ id: event.currentTarget.value }));
    setTimeout(() => {
      dispatch(resetErrorSuccess(""));
    }, 3000);
  };

  return (
    <>
      <div style={{ width: "100%", height: "50px" }}></div>
      <Grid container >
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          <input
            onChange={handleChange}
            name="firstName"
            value={findFriend.firstName}
            placeholder="Search by name"
            className="searchFriends"
          ></input>
        </Grid>
        
        <Grid item xs={1}></Grid>

        <Grid  item xs={2}>
          <button className="findFriendButton" onClick={handleSearch}>Search</button>
        </Grid>
        <Grid item xs={1}></Grid>
        
        <Grid item xs={12}>
          <br style={{hight: '1px'}}/>
          
          
          <Alerts fail={fail} success={success} /></Grid>
        
        
        
        <Grid item xs={12}>
          <h6 style={{ textAlign: "center", color: "white", marginTop:"5px", marginBottom:"5px" }}>Results</h6>
        </Grid>

        {results.length > 0 && results[0] !== "empty" ? (
          results.map((person) => (
            <>
              <button
                onClick={AddFriend}
                value={person.id}
                className="possibleFriendResultButtonAddContact"
              >
                <Grid className="possibleFriendResultAddContact" item xs={3}>
                  <div className="friendImageMessageContainer">
                  <div
                    style={{
                      backgroundImage: `url(${person.image})`,
                      backgroundSize: "contain",
                    }}
                    className="friendImage"
                  >
                    
                  </div>
                  </div>
                </Grid>
                <Grid className="possibleFriendResultAddContact" item xs={9}>
                  {person.firstandlast}
                </Grid>
              </button>
            </>
          ))
        ) : (
          results[0] === "empty" ? 
          <Grid item xs={12}>
          <p style={{color: "white", textAlign: "center"}}>No friends by that name</p> 
          </Grid>: <></>
        )}
      </Grid>
    </>
  );
}
