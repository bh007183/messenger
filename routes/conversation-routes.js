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
   
    let partArr = [{ id: data.id, name: '' }]
    await req.body.forEach(element => {
      
      partArr.push(element)
    });
    
    let resData = await db.Conversation.create({participants: JSON.stringify(partArr)}).catch((err) =>
    console.log(err)
  );

   await partArr.forEach(obj => {
     
    resData.setUsers(obj.id).catch(err => res.status(500).json(err))
   }) 
 
   res.status(200).json(resData)
  } else {
    res.status(403);
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
        },
        include: [
          {model: db.Conversation,
          include:[{
            model: db.Message,
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]],
          }]}
        ]
      }).catch((err) => res.json(err));
      
      
     
      
      res.status(200).json(postedData)
    } else {
      res.status(403);
    }
  }
});

router.get("/api/getSpecificConversation/:id", async (req, res) => {

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
      let postedData = await db.Conversation.findOne({
        where:{
          id: req.params.id
        },
        include: {
          model: db.Message,
          
          
        },
        
      }).catch((err) => res.json(err));
      let conversationParticipants = await postedData.getUsers(
        {attributes: ["firstandlast"]} 
      )

      const resdata = {
        messages: postedData.Messages,
        participants: conversationParticipants

      }
      
      res.status(200).json(resdata)

    } else {
      res.status(403);
    }
  }
});




module.exports = router;