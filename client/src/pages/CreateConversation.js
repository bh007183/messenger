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
import Alert from "../components/Alerts"


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

  const createConverseFail = useSelector(
    (state) => state.store.Conversation.Error
  );

  const friendFail = useSelector(
    (state) => state.store.User.Error
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
        <Alert fail={createConverseFail || friendFail }/>
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
                src={friend.image}
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
                  backgroundImage: `url(${Part.image})`,
                  backgroundSize: "contain",
                }}
                className="friendImage"
              >
                <p className="whiteText" style={{fontSize: ".5rem"}}>{Part.name}</p>
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
        <Grid container  className="FriendsContainer">
          {Friends.length > 0 ? (
            Friends.map((person) => (
              <>
              
              <Grid item style={{marginLeft:"4.8%",marginRight:"2%" }} xs={5}>
                <button
                  key={person.id}
                  onClick={AddTo}
                  value={JSON.stringify(
                    (addtoconvers = {
                      id: person.id,
                      name: person.firstandlast,
                      image: person.image
                    })
                  )}
                  className="possibleFriendResultButton"
                >
                  <div className="possibleFriendResult">
                    <div className="CurrentFriendImageConatiner">
                      <div
                        style={{
                          backgroundSize: "contain",
                          backgroundImage: `url(${person.image})`,
                          
                        }}
                        className="friendImage"
                      ></div>
                    </div>
                  </div>
                  <p style={{ textAlign: "center" }}>{person.firstandlast}</p>

                  
                </button>
              </Grid>
              
              </>
            ))
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
