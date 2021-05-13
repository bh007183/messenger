import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";

import {getAllConversations} from "../store/conversationActions"
import {useSelector, useDispatch} from "react-redux"
 



export default function Main() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.state)



    useEffect(  () => {
        console.log("potato")
        dispatch(getAllConversations())
        
    }, [])
  return (
    <div>
      
        <Grid container>
         
        </Grid>
     
    </div>
  );
}
