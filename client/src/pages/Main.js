import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import MessageBar from "../components/MessageBar"
import Conversations from "../components/Conversations"

import {getAllConversations} from "../store/conversationActions"
import {useSelector, useDispatch} from "react-redux"
 



export default function Main() {
  const dispatch = useDispatch()
  const convers = useSelector(state => state.store.Conversation.Conversations)



    useEffect(  () => {
        console.log("potato")
        dispatch(getAllConversations())
        
        
    }, [])
  return (
    <>
        <br></br>
        <br></br>
        <Grid container>
        { convers ? convers.map((item, index) => <Conversations id={item.id} key={index}/>) : <p>You will need to add friends and then create a Conversation</p>}
        

        </Grid>
        
        
     
    </>
  );
}
