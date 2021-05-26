import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid'
import {searchCurrentFriends} from "../store/userActions"
import {addMessagePartAPI} from "../store/messageActions"
import {setModalError, resetMessage } from "../store/messageActions";
import "./style.css"
import Alerts from "../components/Alerts"








export default function AddModal(props) {
  const dispatch = useDispatch()
  const fail = useSelector((state) => state.store.Message.modalError)
  const success = useSelector((state) => state.store.Message.Success)
  
  const Friends = useSelector((state) => state.store.User.SearchedFriends);

  // const result: Friends = useSelector(selector: Function, equalityFn?: Function)
  const CurrentConversation = useSelector((state) => state.store.Conversation.ConversationCreated.ConversationId);
  

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

  if(fail !== "") {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 3000);
  }
  if(success !== "") {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 3000);
  }

  const addPart = (event) => {
    dispatch(addMessagePartAPI({ConversationId: CurrentConversation, UserId: event.currentTarget.value}))
  }


  const body = (
    <div className={"modal"}>
      <Grid container>
      
      <Grid className="searchFriends"item xs={2}></Grid>
      <Grid item  xs={8}>
      <br></br>
      <br></br>
        <input
          onChange={handleChange}
         
          placeholder="Search friends"
          style={{borderRadius: "20px", width: "95%"}}
        ></input>
      </Grid>
      <Grid className="searchFriends"item xs={2}></Grid>
      
      
      <Grid item xs={12}>
        <h4 style={{ textAlign: "center", color: "white", marginTop: "6px", marginBottom: "6px" }}>Friends</h4>
      </Grid>
      </Grid>
      <Alerts fail={fail} success={success} /> 
      <Grid container>
     {Friends.map(friend => 
     <>
       <button onClick={addPart} value={friend.id} className="possibleFriendResultButtonAddContact">
       <Grid style={{height: "50px"}} item xs={4}>
         <img style={{height: "50px"}} src="https://placedog.net/500" alt="Profile Pic"></img>
       </Grid>
       <Grid style={{height: "50px", display: "flex", justifyContent: "center", alignItems: 'center'}} item xs={8}>
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