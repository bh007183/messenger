import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActionCreators"

const slice = createSlice({
    name: "Message",
    initialState: {
        Username: "",
        Participents: [],

    },
    reducers: {
        setMessage: (Message, action) => {
            Message.Participents.push("scram")
        }
    }

})

export const {setMessage} = slice.actions
export default slice.reducer


