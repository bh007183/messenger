import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, socketCallBegan } from "./apiActionCreators";
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
//     socketConnect: (Message, action) => {
//         socket = io.connect("http://localhost:8080", {path: "/messageRelay"})
      
      
//   },
    socketResponse: (Message, action) => {

       Message.Messages.push(action.payload)
      
  },
}
});

export const { setMessages, socketResponse} = slice.actions;
export default slice.reducer;

export const getAllMessages = () =>
  apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/getAllMessages`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "GET",
    onSuccess: setMessages.type,
    // onError
  });

export const sendMessageAPI = (data) =>
  apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/sendMessage`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    data: data,
    method: "POST",
    // onSuccess: setMessages.type,
    // onError
  });
export const getSpecificMessages = (id) =>
  apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/getSpecificConversation/${id}`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "GET",
    onSuccess: setMessages.type,
    // onError
  });

//   export const socketSend = (data) => {
//       socket.send(data)

//   }
