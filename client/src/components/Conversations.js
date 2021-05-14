import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid'


export default function Conversations(props) {
    
    
    
    return (
        <>
        
            <Grid className="conversationToken" item xs={3}>
                <p>{props.id}</p>

            </Grid>
            <Grid className="recentActivity" item xs={9}>

            </Grid>
           
            
        
        </>
    )
}
