const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");

//Create a conversation

// router.post("/api/conversation", async (req, res) => {
  
//   let data = await db.Conversation.create(req.body).catch((err) =>
//     res.status(401).send(err)
//   );
//   // replace user id with id in token
//    await data.setUsers(req.body.UserId).catch(err => console.log(err))
 
//   res.json(data);
// });

router.post("/api/createConversation", async (req, res) => {
let token = false;
if (!req.headers) {
  token = false;
} else if (!req.headers.authorization) {
  token = false;
} else {
  token = req.headers.authorization.split(" ")[1];
}
if (!token) {
  res.status(500).send("Please Login");
} else {
  const data = await jwt.verify(token, process.env.JWS_TOKEN, (err, data) => {
    if (err) {
      res.status(500).send("Session Expired. Please Login.");
    } else {
      return data;
    }
  });
  if (data) {
   
    let partArr = [{ id: data.id, name: data.firstandlast }]
    await req.body.forEach(element => {
      
      partArr.push(element)
    });
    
    let resData = await db.Conversation.create({participants: JSON.stringify(partArr)}).catch((err) =>
    res.status(409).send("There was an issue creating a conversation.")
  );

   await partArr.forEach(obj => {
     
    resData.setUsers(obj.id).catch(err => res.status(500).send("Not all users may have been added properly to conversation."))
   }) 
   
   res.status(200).json(resData)
  } else {
    res.status(403).send("Session Expired. Please Login.");
  }
}
});

// Add a participent









router.get("/api/getAllConversations", async (req, res) => {
   
  let token = false;
  if (!req.headers) {
    token = false;
  } else if (!req.headers.authorization) {
    token = false;
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(500).send("Please Login");
  } else {
    const data = await jwt.verify(token, process.env.JWS_TOKEN, (err, data) => {
      if (err) {
        res.status(403).send("Session Expired");
      } else {
        return data;
      }
    });
    if (data) {
      let postedData = await db.User.findOne({
        where:{
          id: data.id
        },
        include: [
          {model: db.Conversation,
          include:[{
            model: db.Message,
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]],
          },{
            model: db.User,
          }]}
        ]
      }).catch((err) => res.status(409).send("There was an issue getting your conversations. logout and login."));
      
      
     
      
      res.status(200).json(postedData)
    } else {
      res.status(403).send("Session Expired");
    }
  }
});






module.exports = router;