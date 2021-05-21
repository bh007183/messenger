import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";

import Conversations from "../components/Conversations";

import { getAllConversations } from "../store/conversationActions";
import { useSelector, useDispatch } from "react-redux";

export default function Main() {
  const RedirectControl = useSelector(
    (state) => state.store.Conversation.ConversationCreated.Redirect
  );
  const dispatch = useDispatch();
  const convers = useSelector(
    (state) => state.store.Conversation.Conversations.Conversations
  );

  useEffect(() => {
    console.log("potato");
    dispatch(getAllConversations());
  }, []);
  return (
    <>
      {RedirectControl !== false ? <Redirect push to="/message" /> : <></>}
      <br></br>
      <br></br>
      <h3 style ={{textAlign:"center", color: "white"}}>Conversations</h3>
      {console.log(convers)}
      <Grid container>
        {convers ? (
          convers.map((item, index) => (
            item.Messages.length ?  
            <Conversations id={item.id} participants={JSON.parse(item.participants)} recentMessage={item.Messages[0].message} recentAuthor={item.Messages[0].author} key={index} /> :
            <Conversations id={item.id} participants={JSON.parse(item.participants)} recentMessage={"No Messages as of yet."} key={index} />
          ))
        ) : (
          <p>You will need to add friends and then create a Conversation</p>
        )}
      </Grid>
    </>
  );
}
