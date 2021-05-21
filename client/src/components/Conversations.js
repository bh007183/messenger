import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setConversationId } from "../store/conversationActions";




export default function Conversations(props) {

  const dispatch = useDispatch();

  const handleClick = (event) => {
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
          {props.participants.map(item => (
            <div style={{fontSize: "8px", color:"white"}}>{item.name}</div>
          )

          )}
        </Grid>
        <Grid className="possibleFriendResult" item xs={9}>
          <div>{props.recentMessage}</div>
        </Grid>
      </button>
    </>
  );
}
