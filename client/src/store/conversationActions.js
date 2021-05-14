import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActionCreators";

const slice = createSlice({
  name: "Conversation",
  initialState: {
    Conversations: [],
  },
  reducers: {
    setConversations: (Conversation, action) => {
      Conversation.Conversations = action.payload;
    },
  },
});

export const { setConversations } = slice.actions;
export default slice.reducer;

export const getAllConversations = () =>
  apiCallBegan({
    url: `http://localhost:8080/api/getAllConversations`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "GET",
    onSuccess: setConversations.type,
    // onError: console.log(action.payload)
  });
