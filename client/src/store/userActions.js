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
        Error: "",
        user: {}

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
            console.log(action.payload)
            User.YourName = action.payload.user
            localStorage.setItem("user", action.payload.user)
            localStorage.setItem("token", action.payload.token)
        },
       
        possibleFrinedMatch: (User, action) => {
            if(action.payload.length > 0){
                User.PossibleFriends = action.payload 
            }else{
                User.PossibleFriends = ["empty"]
            }
            
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
        },

        setManageAccount: (User, action) => {
            User.user = action.payload
        },

        userUpdateChangeHandler: (User, action) => {
            User.user[action.payload.name] = action.payload.value
        },

        accountDestroySuccess: (User, action) => {
            User.Success = action.payload
            localStorage.clear()
            
                window.location.href = "/"
            

            
        },



    }

})

export const {setSuccess, setError, resetErrorSuccess, loginSuccess, possibleFrinedMatch, setFriends, setSearched, noSetSearched,setManageAccount, userUpdateChangeHandler, accountDestroySuccess} = slice.actions
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
// 
export const findFriends = (username) => apiCallBegan({
    url: `http://localhost:8080/api/findFriends/${username}`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: possibleFrinedMatch.type,
    onError: setError.type,
})
export const addFriends = (FriendId) => apiCallBegan({
    url: `http://localhost:8080/api/addFriend`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    data: FriendId,
    method: "PUT",
    onSuccess: setSuccess.type,
    onError: setError.type,
})


export const getFriends = () => apiCallBegan({
    url: `http://localhost:8080/api/getFriends`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: setFriends.type,
    onError: setError.type,
})
// 
export const searchCurrentFriends = (firstandlast) => apiCallBegan({
    url: `http://localhost:8080/api/searchCurrentFriends/${firstandlast}`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: setSearched.type,
    onError: noSetSearched.type,
})

export const manageAccountAPI = () => apiCallBegan({
    url: `http://localhost:8080/api/manageAccount`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: setManageAccount.type,
    // onError: noSetSearched.type,
})
export const deleteUserAPI = () => apiCallBegan({
    url: `http://localhost:8080/api/deleteUser`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "DELETE",
    onSuccess: accountDestroySuccess.type,
    // onError: noSetSearched.type,
})
export const UpdateAccountAPI = (data) => apiCallBegan({
    url: `http://localhost:8080/api/updateUser`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "PUT",
    data: data,
    onSuccess: setManageAccount.type,
    // onError: noSetSearched.type,
})

