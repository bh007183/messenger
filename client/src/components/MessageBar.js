import React from 'react'
import BottomNavigation from "@material-ui/core/BottomNavigation"
import IconButton from "@material-ui/core/IconButton"
import SendIcon from '@material-ui/icons/Send';
import Grid from "@material-ui/core/Grid"
import "./style.css"

export default function MessageBar() {
    return (
        <BottomNavigation className="MessageBar">
        <Grid container>
            <Grid item xs={10}>
                <input></input>
            </Grid>
            <Grid item xs={2}>
                <IconButton>
                    <SendIcon/>
                </IconButton>
            </Grid>
        </Grid>
        </BottomNavigation>
        
    )
}
