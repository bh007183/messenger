import { createSlice } from "@reduxjs/toolkit";
import {apiCallBegan} from "./apiActionCreators";


const slice = createSlice({
  name: "Message",
  initialState: {
    Messages: [],
    Participants: [],
    messageError: ""
  },
  reducers: {
    setMessages: (Message, action) => {
      Message.Messages = action.payload.messages;
      Message.Participants = action.payload.participants;
    },

    socketResponse: (Message, action) => {
       
       Message.Messages.push(action.payload)
      
  },
    messageError: (Message, action) => {
       Message.messageError = action.payload
  },
  addPart: (Message, action) => {
  
    if(Message.Participants.includes(action.payload)){

    }else{
      Message.Participants.push(action.payload)
    }
   

  }
}
});

export const { setMessages, socketResponse, messageError, addPart} = slice.actions;
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

  export const addMessagePartAPI = (Participent) =>
  apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/addMessagePart`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    data: Participent,
    method: "POST",
    onSuccess: addPart.type,
    // onError: errorConversCreated.type,
  });