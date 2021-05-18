import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActionCreators"


const slice = createSlice({
    name: "User",
    initialState: {
        YourName: "",
        Friends: [],
        PossibleFriends: [],
        Success: "",
        Error: ""

    },
    reducers: {
        setSuccess: (User, action) => {
            User.Success = action.payload
        },
        loginSuccess: (User, action) => {
            console.log(action.payload)
            User.YourName = action.payload.user
            localStorage.setItem("token", action.payload.token)
        },
        setError: (User, action) => {
            User.Error = action.payload
        },
        possibleFrinedMatch: (User, action) => {
            User.PossibleFriends = action.payload
        },
        setFriends: (User, action) => {
            User.Friends = action.payload
        }

    }

})

export const {setSuccess, setError, loginSuccess, possibleFrinedMatch, setFriends} = slice.actions
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

export const findFriends = (username) => apiCallBegan({
    url: `http://localhost:8080/api/findFriends/${username}`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: possibleFrinedMatch.type,
    // onError: setError.type,
})
export const addFriends = (FriendId) => apiCallBegan({
    url: `http://localhost:8080/api/addFriend`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    data: FriendId,
    method: "PUT",
    // onSuccess: possibleFrinedMatch.type,
    // onError: setError.type,
})
export const getFriends = () => apiCallBegan({
    url: `http://localhost:8080/api/getFriends`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: setFriends.type,
    // onError: setError.type,
})