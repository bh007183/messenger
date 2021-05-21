import { useDispatch, useSelector } from "react-redux";
import ParticipantBar from "../components/ParticipantBar";
import { getSpecificMessages, socketResponse, sendMessageAPI, messageError } from "../store/messageActions";
import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import { resetRedirect } from "../store/conversationActions";
import Alerts from "../components/Alerts"

let socket;

export default function Message() {
  const scrollTo = useRef(null);
  const executeScroll = () =>
    scrollTo.current.scrollIntoView({ behavior: "smooth" });
  const dispatch = useDispatch();
  const conversation = useSelector(
    (state) => state.store.Conversation.ConversationCreated.ConversationId
  );
  const messageAuthor = useSelector((state) => state.store.User.YourName);
  const messages = useSelector((state) => state.store.Message.Messages) || [];
  const Participants =
    useSelector((state) => state.store.Message.Participants) || [];
    const messageErr = useSelector((state) => state.store.Message.messageError)

  useEffect(() => {
    executeScroll();
    socket = io.connect("http://localhost:8080", {
      path: `/messageRelay`,
      extraHeaders: {
        authorization: "Bearer: " + localStorage.getItem("token"),
      },
    });

    socket.emit("create", conversation);

    socket.on("message", (data) => {
      console.log(data);
      dispatch(socketResponse(data));
    });

    socket.on("emit", (data) => {
      dispatch(socketResponse(data));
    });

    socket.on("error", (data) => {
      dispatch(messageError(data))
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
  console.log(conversationId);

  const [sendMessage, setSendMessage] = useState({
    message: "",
    author: "",
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

  const messageSend = (event) => {
    setSendMessage({
      ...sendMessage,
      ConversationId: conversationId,
      author: messageAuthor,
    });
    dispatch(sendMessageAPI(sendMessage));
    socket.send(JSON.stringify(sendMessage));
  };

  return (
    <>
      <div
        className="ParticipantBarContainer"
        style={{
          width: "100%",
          overflow: "scroll",
          background: "green",
          display: "flex",
        }}
      >
        {Participants.map((Part, index) => (
          <ParticipantBar name={Part.firstandlast} key={index} />
        ))}
      </div>
      <div style={{ width: "100%", height: "110px" }}></div>
      

      {messages.length > 0 ? (
        messages.map((item, index) => (
          <Grid className="partList" key={index} container>
            <Grid item xs={12}>
              <div style={{ color: "white" }}>{item.author}</div>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid className="displayMessage" item xs={10}>
              {item.message}
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        ))
      ) : (
        <></>
      )}
      {messageErr !== "" ?<Alerts fail={messageErr} />  : <></>}
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
