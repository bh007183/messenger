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
    ConversationCreatedError: "",
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

    errorConversCreated: (Conversation) => {
      Conversation.ConversationCreatedError =
        "A Conversation was unable to be created at this time!";
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
  errorConversCreated,
  setConversationId,
  Redirect,
  resetRedirect
} = slice.actions;
export default slice.reducer;

export const getAllConversations = () =>
  apiCallBegan({
    url: `http://localhost:8080/api/getAllConversations`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "GET",
    onSuccess: setConversations.type,
    // onError: console.log(action.payload)
  });

export const createConversationAPI = (Participents) =>
  apiCallBegan({
    url: `http://localhost:8080/api/createConversation`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    data: Participents,
    method: "POST",
    onSuccess: successConversCreated.type,
    onError: errorConversCreated.type,
  });
