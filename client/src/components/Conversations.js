import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setConversationId } from "../store/conversationActions";
import { Redirect } from "react-router-dom";

export default function Conversations(props) {
  const conversation = useSelector(
    (state) => state.store.Conversation.ConversationCreated.ConversationId
  );

  const dispatch = useDispatch();

  const handleClick = (event) => {
    console.log(event);

    dispatch(setConversationId(event.currentTarget.value));
  };

  return (
    <>
      <button
        onClick={handleClick}
        value={props.id}
        className="conversationButton"
      >
        <Grid className="possibleFriendResult" item xs={3}>
          {props.id}
        </Grid>
        <Grid className="possibleFriendResult" item xs={9}></Grid>
      </button>
    </>
  );
}
