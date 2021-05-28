import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {manageAccountAPI, deleteUserAPI} from "../store/userActions"
export default function ManageAccount() {
    const dispatch = useDispatch()

    let userData = useSelector(state => state.store.User.user)

    const [user, userState] = useState({
        username: "",
        name: "",
        connections: "",
        email: "",
        image: "",

    })

useEffect(() => {
dispatch(manageAccountAPI())

    
}, [])

var widget = window.cloudinary.createUploadWidget({
    cloudName: process.env.REACT_APP_COUDNAME,
      uploadPreset: process.env.REACT_APP_COUDPRESET}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        userState({ ...user, image: result.info.url })
      }
    }
  )
  
  const handleImageUpload = (event) => {
    event.preventDefault()
    widget.open()
  }
  const deleteUser = (event) => {
   dispatch(deleteUserAPI())
  }


    return (
        <div>
            <form>
            <div style={{height: "300px"}}></div>
                <input value={userData.username} placeholder="Username"></input>
                <input value={userData.firstandlast}placeholder="Name"></input>
                <input value={userData.email}placeholder="Email"></input>
                <img src={user.image}/>
                



                <button type="click" id="upload_widget" onClick={handleImageUpload} >Change Photo</button>
                <button type="click"  onClick={deleteUser} >Delete Account</button>

            </form>
            
        </div>
    )
}
