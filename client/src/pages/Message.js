import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {SuccessReset} from "../store/conversationActions"
import MessageBar from "../components/MessageBar"

export default function Message() {

    // if(window.location.pathname = "/message"){
    //     useDispatch(SuccessReset())

    // }
    
    

    // useEffect(() => {
        
    // }, [])

    return (
        <MessageBar/>
    )
}
