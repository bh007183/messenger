import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid'
import {searchCurrentFriends} from "../store/userActions"
import {addMessagePartAPI} from "../store/messageActions"
import "./style.css"







export default function AddModal(props) {
  const dispatch = useDispatch()
  console.log("runin")
  const Friends = useSelector((state) => state.store.User.SearchedFriends);

  // const result: Friends = useSelector(selector: Function, equalityFn?: Function)
  const CurrentConversation = useSelector((state) => state.store.Conversation.ConversationCreated.ConversationId);
  console.log(Friends)

  const [findFriend, setFindFriend] = useState({
    firstName: "",
  });

  
  const handleChange = (event, search) => {
    
    let value = event.target.value;
    setFindFriend({
      ...findFriend,
      firstName: value,
    }); 

    dispatch(searchCurrentFriends(event.target.value))
      
 
    
  };


  const addPart = (event) => {
    dispatch(addMessagePartAPI({ConversationId: CurrentConversation, UserId: event.currentTarget.value}))
  }


  const body = (
    <div className={"modal"}>
      <Grid container>
    
      <Grid className="searchFriends"item xs={2}></Grid>
      <Grid item  xs={8}>
        <input
          onChange={handleChange}
         
          placeholder="Search friends"
          style={{borderRadius: "20px", width: "95%"}}
        ></input>
      </Grid>
      <Grid className="searchFriends"item xs={2}></Grid>
      <Grid className="searchFriends"item xs={4}></Grid>
      <Grid className="findFriendButton" item xs={4}>
        {/* needs to know what to do */}
        <button >Search</button>
      </Grid>
      <Grid className="searchFriends"item xs={4}></Grid>
      
      <br></br>
      <br></br>
      <Grid item xs={12}>
        <h6 style={{ textAlign: "center", color: "white" }}>Friends</h6>
      </Grid>
      </Grid>
      <Grid container>
     {Friends.map(friend => 
     <>
       <button onClick={addPart} value={friend.id} className="possibleFriendResultButtonAddContact">
       <Grid style={{height: "40px"}} item xs={4}>
         <img style={{height: "40px"}} src="https://placedog.net/500" alt="Profile Pic"></img>
       </Grid>
       <Grid style={{height: "40px"}} item xs={8}>
         {friend.firstandlast}

       
       </Grid>
       </button>
       <br></br>
       <br></br>
       </>

     )} 
     </Grid>
      
      
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}