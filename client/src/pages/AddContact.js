import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import { findFriends, addFriends } from "../store/userActions";
import { useDispatch, useSelector } from "react-redux";


export default function AddContact() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.store.User.PossibleFriends);

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
      
      
      dispatch(addFriends({id: event.currentTarget.value}))

  }

  return (
    // <br></br>
    <Grid container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Grid item xs={2}></Grid>
      <Grid item xs={6}>
        <input
          onChange={handleChange}
          name="firstName"
          value={findFriend.firstName}
          placeholder="Search by name"
          className="searchFriends"
        ></input>
      </Grid>
      <Grid className="findFriendButton" item xs={2}>
        <button onClick={handleSearch}>Search</button>
      </Grid>
      <Grid item xs={2}></Grid>
      <br></br>
      <br></br>

      {results.length > 0 ? (
        results.map((person) => (
          <>
            <Grid item xs={12}>
              <h6 style={{ textAlign: "center", color: "white" }}>Results</h6>
            </Grid>
            <button onClick={AddFriend} value={person.id} className="possibleFriendResultButton">
              <Grid className="possibleFriendResult" item xs={3}></Grid>
              <Grid className="possibleFriendResult" item xs={9}>
                {person.firstandlast}
              </Grid>
            </button>
          </>
        ))
      ) : (
        <></>
      )}
    </Grid>
  );
}
