import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuccessReset } from "../store/conversationActions";
import MessageBar from "../components/MessageBar";
import { getSpecificMessages } from "../store/messageActions";
import Grid from "@material-ui/core/Grid";

export default function Message() {
  const dispatch = useDispatch();
  const conversation = useSelector(
    (state) => state.store.Conversation.ConversationCreated.ConversationId
  );
  const messages = useSelector((state) => state.store.Message.Messages) || [];
  const Participants = useSelector((state) => state.store.Message.Participants) || [];
  

  useEffect(() => {
    console.log(conversation);
    dispatch(getSpecificMessages(conversation));
  }, []);

  return (
    <>
    <div style={{width: "100%", overflow: "scroll", background: "green"}}>
    {Participants.map((Part, index) => (
            <div key={index} className="friendImageMessageContainer">
              <div
                style={{
                  backgroundImage: `url("http://placekitten.com/200/300")`,
                }}
                className="friendImageMessage"
              >
                <p style={{fontSize: ".1em", margin: "0px"}} className="whiteText">{Part.firstandlast}</p>
              </div>
            </div>
            ))}
            </div>


      {messages.length > 0 ? (
        messages.map((item) => (
          <Grid  container>
            <Grid item xs={12}><div style={{color: "white"}}>name</div></Grid>
            <Grid item xs={1}></Grid>
            <Grid className="displayMessage" item xs={10}>{item.message}</Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        ))
      ) : (
        <></>
      )}

      <MessageBar />
    </>
  );
}
