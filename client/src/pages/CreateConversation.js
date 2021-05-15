import React, { useEffect, useState } from "react";
import { getFriends } from "../store/userActions";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";

export default function CreateConversation() {
  const dispatch = useDispatch();
  const Friends = useSelector((state) => state.store.User.Friends);

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
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  return (
    <Grid container>
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
        <button>Search</button>
      </Grid>
      <Grid item xs={2}></Grid>
      <br></br>
      <br></br>
      <Grid item xs={12}>
        <h6 style={{ textAlign: "center", color: "white" }}>Results</h6>
      </Grid>

      {Friends.length > 0 ? (
        Friends.map((person) => (
          <>
            <button value={person.id} className="possibleFriendResultButton">
              <Grid className="possibleFriendResult" item xs={3}></Grid>
              <Grid className="possibleFriendResult" item xs={9}>
                {person.firstandlast}
              </Grid>
            </button>
          </>
        ))
      ) : (
        // <Redirect to="/AddContact"/>
        <></>
      )}
    </Grid>
  );
}
