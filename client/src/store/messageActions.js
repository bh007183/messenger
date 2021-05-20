import { createSlice } from "@reduxjs/toolkit";
import {apiCallBegan} from "./apiActionCreators";
import { io } from "socket.io-client";
let socket;

const slice = createSlice({
  name: "Message",
  initialState: {
    Messages: [],
    Participants: [],
  },
  reducers: {
    setMessages: (Message, action) => {
      Message.Messages = action.payload.messages;
      Message.Participants = action.payload.participants;
    },

    socketResponse: (Message, action) => {

       Message.Messages.push(action.payload)
      
  },
}
});

export const { setMessages, socketResponse} = slice.actions;
export default slice.reducer;

export const getAllMessages = () =>
  apiCallBegan({
    url: `http://localhost:8080/api/getAllMessages`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "GET",
    onSuccess: setMessages.type,
    // onError
  });

export const sendMessageAPI = (data) =>
  apiCallBegan({
    url: `http://localhost:8080/api/sendMessage`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    data: data,
    method: "POST",
    // onSuccess: setMessages.type,
    // onError
  });
export const getSpecificMessages = (id) =>
  apiCallBegan({
    url: `http://localhost:8080/api/getSpecificConversation/${id}`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "GET",
    onSuccess: setMessages.type,
    // onError
  });

//   export const socketSend = (data) => {
//       socket.send(data)

//   }
