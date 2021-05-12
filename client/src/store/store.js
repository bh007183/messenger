import {combineReducers} from "redux"
import messageReducer from "./messageActions"
import userReducer from "./userActions"

export default combineReducers({
    User: userReducer,
    Message:  messageReducer
    
})