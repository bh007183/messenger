import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActionCreators"


const slice = createSlice({
    name: "User",
    initialState: {
        YourName: "",
        Friends: [],
        SearchedFriends: [],
        PossibleFriends: [],
        Success: "",
        Error: ""

    },
    reducers: {
        setSuccess: (User, action) => {
            User.Success = action.payload
        },
        setError: (User, action) => {
            User.Error = action.payload.data;
        },
        resetErrorSuccess: (User, action) => {
            User.Success = action.payload
            User.Error = action.payload
        },
        
        loginSuccess: (User, action) => {
            
            User.YourName = action.payload.user
            localStorage.setItem("user", action.payload.user)
            localStorage.setItem("token", action.payload.token)
        },
       
        possibleFrinedMatch: (User, action) => {
            User.PossibleFriends = action.payload
        },
        setFriends: (User, action) => {
            User.Friends = action.payload
        },
        // not in use
        setSearched: (User, action) => {
            
            User.SearchedFriends = action.payload
           
        },
        noSetSearched: (User, action) => {
           
            User.SearchedFriends = []
           
        }

    }

})

export const {setSuccess, setError, resetErrorSuccess, loginSuccess, possibleFrinedMatch, setFriends, setSearched, noSetSearched} = slice.actions
export default slice.reducer

export const createAccountAPI = (user) => apiCallBegan({
    url: "https://messenger-improved-bjh.herokuapp.com/api/createUser",
    data: user,
    method: "POST",
    onSuccess: setSuccess.type,
    onError: setError.type,


})
export const loginAccount = (user) => apiCallBegan({
    url: "https://messenger-improved-bjh.herokuapp.com/login",
    data: user,
    method: "POST",
    onSuccess: loginSuccess.type,
    onError: setError.type,
})

export const findFriends = (username) => apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/findFriends/${username}`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: possibleFrinedMatch.type,
    // onError: setError.type,
})
export const addFriends = (FriendId) => apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/addFriend`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    data: FriendId,
    method: "PUT",
    onSuccess: setSuccess.type,
    onError: setError.type,
})


export const getFriends = () => apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/getFriends`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: setFriends.type,
    // onError: setError.type,
})

export const searchCurrentFriends = (firstandlast) => apiCallBegan({
    url: `https://messenger-improved-bjh.herokuapp.com/api/searchCurrentFriends/${firstandlast}`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: setSearched.type,
    onError: noSetSearched.type,
})

