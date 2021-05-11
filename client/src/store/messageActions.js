import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActionCreators"

const slice = createSlice({
    name: "Message",
    initialState: {
        Username: "",
        Friends: [],

    },
    reducers: {
        setMessage: ("Message", action) => {
            console.log("laskdjf")
        }
    }

})

export const {setMessage} = slice.actions
export default slice.reducer