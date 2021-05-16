import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {SuccessReset} from "../store/conversationActions"
import MessageBar from "../components/MessageBar"
import {getSpecificMessages} from "../store/messageActions"

export default function Message() {
    const dispatch = useDispatch()
    const conversation = useSelector((state) => state.store.Conversation.ConversationCreated)
    console.log(conversation)

    
    
    

    useEffect(() => {
        dispatch(getSpecificMessages(conversation))
        
    }, [])

    return (
        <MessageBar/>
    )
}
