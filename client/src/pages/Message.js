import { useDispatch, useSelector } from "react-redux";
import ParticipantBar from "../components/ParticipantBar";
import { getSpecificMessages, socketResponse, sendMessageAPI, Error, resetError } from "../store/messageActions";
import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import { resetRedirect } from "../store/conversationActions";
import Alerts from "../components/Alerts"
import AddIcon from '@material-ui/icons/Add';
import AddModal from "../components/addModal"
import { getFriends } from "../store/userActions";
let socket;

export default function Message() {
  const scrollTo = useRef(null);
  
    
  const dispatch = useDispatch();
  const conversation = useSelector(
    (state) => state.store.Conversation.ConversationCreated.ConversationId
  );
  
  const messages = useSelector((state) => state.store.Message.Messages) || [];
  const Participants =
    useSelector((state) => state.store.Message.Participants) || [];
    const fail = useSelector((state) => state.store.Message.Error)

  useEffect(() => {
    
    socket = io.connect("http://localhost:8080", {
      path: `/messageRelay`,
      extraHeaders: {
        authorization: "Bearer: " + localStorage.getItem("token"),
      },
    });

    socket.emit("create", conversation);

    socket.on("message", (data) => {
   
      dispatch(socketResponse(data));
    });

    socket.on("emit", (data) => {
      dispatch(socketResponse(data));
    });

    socket.on("error", (data) => {
      dispatch(Error(data))
    })

    dispatch(getSpecificMessages(conversation));

    dispatch(resetRedirect());
    return () => {
      socket.emit("leave", conversation)
      socket.disconnect();
    };
  }, []);

  const conversationId = useSelector(
    (state) => state.store.Conversation.ConversationCreated.ConversationId
  );
  

  const [sendMessage, setSendMessage] = useState({
    message: "",
    author: localStorage.getItem("user"),
    ConversationId: conversationId,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSendMessage({
      ...sendMessage,
      [name]: value,
    });
  };

  useEffect(() => {
    scrollTo.current.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const messageSend = (event) => {
    setSendMessage({
      ...sendMessage,
      ConversationId: conversationId,
    });
    dispatch(sendMessageAPI(sendMessage));
    socket.send(JSON.stringify(sendMessage));
  };

  // modal handler

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const GetFriends = () => {
    handleOpen();
    dispatch(getFriends())
  }

  return (
    <>
    <AddModal handleOpen={handleOpen} handleClose={handleClose} open={open}/>
    
    <Grid container className="ParticipantBarContainer">
    <Grid item xs={11}>
      <div
        
        style={{
          width: "100%",
          overflow: "scroll",
          background: "#7395AE",
          display: "flex",
        }}
      >
        {Participants.map((Part, index) => (
          <ParticipantBar name={Part.firstandlast} key={index} />
        ))}
      </div>
     
      </Grid>
      <Grid style={{display: "flex",background: "#7395AE", justifyContent:"center", alignItems: "center"}} item xs={1}>
      <IconButton style={{background: "#557A95"}} size="small" onClick={GetFriends}>
        <AddIcon></AddIcon>

        </IconButton>
      </Grid>
      </Grid>
      
      <Grid item xs={12} style={{height: "110px"}}>
        {/* spacer block for mesages */}
      </Grid>
      
      {messages.length > 0 ? (
        messages.map((item, index) => (
          <Grid className="partList" key={index} container>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <div style={{ color: "#557A95", marginTop:"7px" }}>{item.author}</div>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid className="displayMessage" item xs={10}>
              <p>{item.message}</p>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        ))
      ) : (
        <></>
      )}
      {fail !== "" ? <Alerts fail={fail} />  : <></>}
      <div ref={scrollTo} style={{ height: "55px" }}>
        {" "}
      </div>

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
    </>
  );
}
