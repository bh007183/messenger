import {combineReducers} from "redux"
import messageReducer from "./messageActions"
import userReducer from "./userActions"
import conversationReducer from "./conversationActions"

export default combineReducers({
    User: userReducer,
    Message:  messageReducer,
    Conversation: conversationReducer
    
})