import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActionCreators"

const slice = createSlice({
    name: "User",
    initialState: {
        Username: "",
        Friends: [],
        Success: "",
        Error: ""

    },
    reducers: {
        setSuccess: (User, action) => {
            User.Success = action.payload
        },
        loginSuccess: (User, action) => {
            console.log(action.payload)
            User.Username = action.payload.user
            localStorage.setItem("token", action.payload.token)
        },
        setError: (User, action) => {
            User.Error = action.payload
        }
    }

})

export const {setSuccess, setError, loginSuccess} = slice.actions
export default slice.reducer

export const createAccountAPI = (user) => apiCallBegan({
    url: "http://localhost:8080/api/createUser",
    data: user,
    method: "POST",
    onSuccess: setSuccess.type,
    onError: setError.type,


})
export const loginAccount = (user) => apiCallBegan({
    url: "http://localhost:8080/login",
    data: user,
    method: "POST",
    onSuccess: loginSuccess.type,
    onError: setError.type,


})