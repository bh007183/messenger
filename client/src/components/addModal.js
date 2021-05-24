import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid'
import findCurrentFriends from "../store/userActions"


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



export default function AddModal(props) {
  const dispatch = useDispatch()
  const Friends = useSelector((state) => state.store.User.SearchedFriends);
  console.log(Friends)

  const [findFriend, setFindFriend] = useState({
    firstName: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setFindFriend({
      ...findFriend,
      [name]: value,
    });

    dispatch(findCurrentFriends(findFriend.firstName))

  };
  // useEffect(() => {
  //   dispatch(findCurrentFriends(findFriend.firstName))
  // }, [findFriend.firstName])

   


 

  const body = (
    <div className={"modal"}>
      <Grid container>
    
      <Grid className="searchFriends"item xs={2}></Grid>
      <Grid item  xs={8}>
        <input
          onChange={handleChange}
          name="firstName"
          value={findFriend.firstName}
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
     {Friends.map(friend => {
       <>
       <Grid item xs={4}>
         <img src="https://placedog.net/500"></img>
       </Grid>
       <Grid item xs={8}>
         {friend.firstandlast}

       </Grid>
       </>

     })} 
      
      
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