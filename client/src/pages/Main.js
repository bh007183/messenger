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
console.log(convers)
  useEffect(() => {
    dispatch(getAllConversations());
  }, []);
  return (
    <>
      {RedirectControl !== false ? <Redirect push to="/message" /> : <></>}
      <br></br>
      <br></br>
      <h3 style ={{textAlign:"center", color: "white"}}>Conversations</h3>
      
      
        {convers ? (
          convers.slice(0).reverse().map((item, index) => (
            item.Messages.length ?  
            <Conversations id={item.id} participants={item.Users} recentMessage={item.Messages[0].message} recentAuthor={item.Messages[0].author} key={index} /> :
            <Conversations id={item.id} participants={item.Users} recentMessage={"No Messages as of yet."} key={index} />
          ))
        ) : (
          <p>You will need to add friends and then create a Conversation</p>
        )}
      
    </>
  );
}
