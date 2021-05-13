import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";

import {getAllMessages} from "../store/messageActions"
import {useSelector, useDispatch} from "react-redux"
 



export default function Main() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.state)



    useEffect( async () => {
        console.log("potato")
        await dispatch(getAllMessages())
        
    }, [])
  return (
    <div>
      
        <Grid container>
         
        </Grid>
     
    </div>
  );
}
