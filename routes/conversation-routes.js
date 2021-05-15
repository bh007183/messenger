const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");

//Create a conversation

router.post("/api/conversation", async (req, res) => {
  
  let data = await db.Conversation.create(req.body).catch((err) =>
    res.status(401).send(err)
  );
  console.log(data.UserId)
  // replace user id with id in token
   await data.setUsers(req.body.UserId).catch(err => console.log(err))
 
  res.json(data);
});

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
  res.status(500);
} else {
  const data = await jwt.verify(token, process.env.JWS_TOKEN, (err, data) => {
    if (err) {
      res.status(403).end();
    } else {
      return data;
    }
  });
  if (data) {
    console.log(req.body)
    let partArr = []
    await req.body.forEach(element => {
      partArr.push(element.id)
    });
    console.log(partArr)
    console.log({participants: partArr})
    let resData = await db.Conversation.create({participants: JSON.stringify(partArr)}).catch((err) =>
    console.log(err)
  );

   await partArr.forEach(id => {
    resData.setUsers(id).catch(err => res.status(500).json(err))
   }) 
 
   res.status(200).json(resData)
  } else {
    res.status(403);
  }
}
});

// Add a participent

router.post("/api/addConversationPart", async (req, res) => {
  
  let data = await db.Conversation.findOne({
    where:{
      id: 1
    }
  }).catch((err) =>
    res.status(401).send(err)
  );
  console.log(data.UserId)
  // replace user id with id in token
   await data.addUsers(2).catch(err => console.log(err))
 
  res.json(data);
});

router.get("/api/getAllConversations", async (req, res) => {
    console.log(req.headers.authorization)
  let token = false;
  if (!req.headers) {
    token = false;
  } else if (!req.headers.authorization) {
    token = false;
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(500);
  } else {
    const data = await jwt.verify(token, process.env.JWS_TOKEN, (err, data) => {
      if (err) {
        res.status(403).end();
      } else {
        return data;
      }
    });
    if (data) {
      let postedData = await db.User.findOne({
        where:{
          id: data.id
        }
      }).catch((err) => res.json(err));
      
      let conversations = await postedData.getConversations()
      res.status(200).json(conversations)
    } else {
      res.status(403);
    }
  }
});




module.exports = router;