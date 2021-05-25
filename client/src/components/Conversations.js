import React from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch} from "react-redux";
import { setConversationId } from "../store/conversationActions";




export default function Conversations(props) {

  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(setConversationId(event.currentTarget.value));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
      <button
        onClick={handleClick}
        value={props.id}
        className="conversationButton"
        
       
      >
        <Grid className="possibleFriendResult"container>
        <Grid  item xs={3}>
          <Grid container>
          {props.participants.map(item => (
            <Grid item xs={12} style={{fontSize: "8px", color:"white", textAlign: "center"}}>{item.name}</Grid>
          )

          )}
          </Grid>
        </Grid>
        <Grid   item xs={9}>
          <div style={{wordWrap: "break-word"}}>{props.recentMessage}</div>
        </Grid>
        </Grid>
      </button>
      </Grid>
    </Grid>
  );
}
