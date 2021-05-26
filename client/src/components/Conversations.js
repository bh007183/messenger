import React from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { setConversationId } from "../store/conversationActions";

export default function Conversations(props) {
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(setConversationId(event.currentTarget.value));
  };

  return (
    // <Grid container>
      <Grid item xs={12}>
        <button
          onClick={handleClick}
          value={props.id}
          className="conversationButton"
        >
          <Grid className="conversationContain" container>
            <Grid item xs={3}>
              <Grid
                item
                xs={12}
                style={{
                  fontSize: "11px",
                  color: "white",
                  textAlign: "center",
                  margin: "2px",
                }}
              >
                <h5>Participants</h5>
              </Grid>
              <Grid container>
                {props.participants.map((item) => (
                  <Grid
                    item
                    xs={6}
                    style={{
                      fontSize: "11px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {item.firstandlast}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid   item xs={9}>
              <div style={{wordWrap: "break-word"}}>
                <br></br>
                <br></br>
                
                {props.recentMessage.substring(0, 50) + "..."}
              </div>
            </Grid>
          </Grid>
        </button>
      </Grid>
    // </Grid>
  );
}
