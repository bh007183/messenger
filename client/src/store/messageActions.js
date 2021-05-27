import { createSlice } from "@reduxjs/toolkit";
import {apiCallBegan} from "./apiActionCreators";


const slice = createSlice({
  name: "Message",
  initialState: {
    Messages: [],
    Participants: [],
    Error: "",
    modalError: "",
    Success: ""
  },
  reducers: {
    setMessages: (Message, action) => {
      Message.Messages = action.payload.messages;
      Message.Participants = action.payload.participants;
    },

    socketResponse: (Message, action) => {
       
       Message.Messages.push(action.payload)
      
  },
      Error: (Message, action) => {
        
       Message.Error = action.payload.data
  },
      setModalError: (Message, action) => {
        
       Message.modalError = action.payload.data
  },
  resetMessage: (Message, action) => {
    Message.Error = ""
    Message.modalError = ""
    Message.Success = ""
},
  addPart: (Message, action) => {
  
    
      Message.Participants.push(action.payload)
      Message.Success = "Added Participant"
    
   

  }
}
});

export const { setMessages, socketResponse, Error, setModalError, resetMessage, addPart} = slice.actions;
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
    onError: setModalError.type,
  });