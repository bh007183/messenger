import React, {useState, useEffect} from "react";

import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import {useSelector, useDispatch} from "react-redux"
import {sendMessageAPI} from "../store/messageActions"

export default function MessageBar() {
    const dispatch = useDispatch()
    const conversationId = useSelector(state => state.store.Conversation.ConversationCreated.ConversationId)
    console.log(conversationId )

    const [sendMessage, setSendMessage] = useState({
        message: "",
        ConversationId: conversationId
    })

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setSendMessage({
            ...sendMessage, [name]: value
        })

    }

    const messageSend = (event) => {
        setSendMessage({
            ...sendMessage, ConversationId: conversationId
        })
        dispatch(sendMessageAPI(sendMessage))

    }


  return (
    <Grid container className="MessageBar">
      <Grid className="inputContainer" item xs={10}>
        <textarea
          name="message"
          onChange={handleChange}
          value={sendMessage.message}
          placeholder="Enter Dispatch..."
          className="messageInput"
        ></textarea>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={messageSend}>
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
