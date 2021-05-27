import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActionCreators";

const slice = createSlice({
  name: "Conversation",
  initialState: {
    Conversations: [],
    initialConversationSet: [],
    ConversationCreated: {
      Redirect: false,
      ConversationId: "",
    },
    Error: "",
  },

  reducers: {
    setConversations: (Conversation, action) => {
      Conversation.Conversations = action.payload;
    },
    initialSetConversParticipants: (Conversation, action) => {
      Conversation.initialConversationSet.push(action.payload);
    },
    successConversCreated: (Conversation, action) => {
      Conversation.initialConversationSet = [];
      Conversation.ConversationCreated.ConversationId = action.payload.id;
      Conversation.ConversationCreated.Redirect = true
    },

    resetRedirect: (Conversation) => {
      Conversation.ConversationCreated.Redirect = false;
    },

    setError: (Conversation, action) => {
      Conversation.Error = action.payload.data
        
    },
    clearError: (Conversation, action) => {
      Conversation.Error = ""
        
    },
    setConversationId: (Conversation, action) => {
      Conversation.ConversationCreated.ConversationId = action.payload;
      Conversation.ConversationCreated.Redirect = true

    }
  },
});

export const {
  setConversations,
  initialSetConversParticipants,
  successConversCreated,
  setError,
  clearError,
  setConversationId,
  Redirect,
  resetRedirect
} = slice.actions;
export default slice.reducer;

export const getAllConversations = () =>
  apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/getAllConversations`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "GET",
    onSuccess: setConversations.type,
    onError: setError.type
  });

export const createConversationAPI = (Participents) =>
  apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/createConversation`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    data: Participents,
    method: "POST",
    onSuccess: successConversCreated.type,
    onError: setError.type,
  });


