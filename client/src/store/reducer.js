import {combineReducers} from 'redux'
import storeReducer from "./store"

export default combineReducers({
    store: storeReducer
})