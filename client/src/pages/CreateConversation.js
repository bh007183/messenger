import React, { useEffect, useState } from "react";
import { getFriends } from "../store/userActions";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import {
  initialSetConversParticipants,
  createConversationAPI,
} from "../store/conversationActions";
import { Redirect } from "react-router-dom";
import { searchCurrentFriends } from "../store/userActions";

export default function CreateConversation() {
  const dispatch = useDispatch();
  const Friends = useSelector((state) => state.store.User.Friends);
  const Participents = useSelector(
    (state) => state.store.Conversation.initialConversationSet
  );
  const RedirectControl = useSelector(
    (state) => state.store.Conversation.ConversationCreated.Redirect
  );
  const searchedFriends = useSelector(
    (state) => state.store.User.SearchedFriends
  );
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
  const AddTo = (event) => {
    dispatch(
      initialSetConversParticipants(JSON.parse(event.currentTarget.value))
    );
  };
  let addtoconvers = {};

  const searchButton = () => {
    dispatch(searchCurrentFriends(findFriend.firstName));
  };

  const createConversation = () => {
    dispatch(createConversationAPI(Participents));
  };
  return (
    <Grid container>
      {RedirectControl !== false ? <Redirect push to="/message" /> : <></>}
      <Grid className="searchFriends" item xs={2}></Grid>
      <Grid item xs={6}>
        <input
          onChange={handleChange}
          name="firstName"
          value={findFriend.firstName}
          placeholder="Search friends"
          className="searchFriends"
        ></input>
      </Grid>
      <Grid className="findFriendButton" item xs={3}>
        {/* needs to know what to do */}
        <button onClick={searchButton} className="a">
          Search
        </button>
      </Grid>
      <Grid item xs={1}></Grid>
      <br></br>
      <br></br>
      <Grid item xs={12}>
        <h6 style={{ textAlign: "center", color: "white" }}>Friends</h6>
      </Grid>
      {searchedFriends.map((friend) => (
        <>
          <button
            value={JSON.stringify(
              (addtoconvers = { id: friend.id, name: friend.firstandlast })
            )}
            onClick={AddTo}
            
            className="possibleFriendResultButtonAddContact"
          >
            <Grid style={{ height: "40px" }} item xs={4}>
              <img
                style={{ height: "40px" }}
                src="https://placedog.net/500"
                alt="Profile Pic"
              ></img>
            </Grid>
            <Grid style={{ height: "40px" }} item xs={8}>
              {friend.firstandlast}
            </Grid>
          </button>
          <br></br>
          <br></br>
        </>
      ))}

      {Participents.length > 0 ? (
        <Grid className="newConversationConstruction" container>
          {Participents.map((Part, index) => (
            <Grid key={index} item xs={2}>
              <div
                style={{
                  backgroundImage: `url("http://placekitten.com/200/300")`,
                }}
                className="friendImage"
              >
                <p className="whiteText">{Part.name}</p>
              </div>
            </Grid>
          ))}
          <Grid item xs={12}>
            <button
              onClick={createConversation}
              className="startConversationBtn"
            >
              Start Conversation
            </button>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <Grid container spacing={2} className="FriendsContainer">
          {Friends.length > 0 ? (
            Friends.map((person) => (
              <Grid item xs={6}>
                <button
                  key={person.id}
                  onClick={AddTo}
                  value={JSON.stringify(
                    (addtoconvers = {
                      id: person.id,
                      name: person.firstandlast,
                    })
                  )}
                  className="possibleFriendResultButton"
                >
                  <div className="possibleFriendResult">
                    <div className="friendImageMessageContainer">
                      <div
                        style={{
                          backgroundImage: `url("http://placekitten.com/200/300")`,
                        }}
                        className="friendImage"
                      ></div>
                    </div>
                  </div>
                  <p style={{ textAlign: "center" }}>{person.firstandlast}</p>

                  {/* <Grid className="possibleFriendResult" item xs={9}>
                {person.firstandlast}
              </Grid> */}
                </button>
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
