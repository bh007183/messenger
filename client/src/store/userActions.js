import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActionCreators"

const slice = createSlice({
    name: "User",
    initialState: {
        Username: "",
        Friends: [],

    },
    reducers: {
        setUser: (User, action) => {
            User.Username = action.payload
        }
    }

})

export const {setUser} = slice.actions
export default slice.reducer

