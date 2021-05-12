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
        setError: (User, action) => {
            User.Error = action.payload
        }
    }

})

export const {setSuccess, setError} = slice.actions
export default slice.reducer

export const createAccountAPI = (user) => apiCallBegan({
    url: "http://localhost:8080/api/createUser",
    data: user,
    method: "POST",
    onSucess: setSuccess,
    onError: setError.type,


})