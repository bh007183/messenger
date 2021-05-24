const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");



router.post("/api/sendmessage", async (req, res) => {

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
      
      
      let postedData = await db.Message.create(req.body).catch((err) => console.log(err));
      // console.log(res.body)
     
      res.status(200);

    } else {
      res.status(403);
    }
  }
  
});



router.get("/api/getAllMessages", async (req, res) => {
  let token = false;
  if (!req.headers) {
    token = false;
  } else if (!req.headers.authorization) {
    token = false;
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
console.log(token)
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
      console.log(data.id + "line 36")
      let postedData = await db.Message.findAll({
        where: {
          participants: { [Op.like]: "%a" + `${data.id}` + "a%" },
        },
      }).catch((err) => res.json(err));
      res.json(postedData);
    } else {
      res.status(403);
    }
  }
});

router.post("/api/addMessagePart", async (req, res) => {

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
      let data = await db.Conversation.findOne({
        where:{
          id: req.body.ConversationId
        }
      }).catch((err) =>
        res.status(401).send(err)
      );

      let parti = await data.addUser(req.body.UserId).catch(err => console.log(err))

      let newPart = await db.User.findOne({
        where: {
          id: req.body.UserId
        },
        attributes:["firstandlast"]
      }).catch(err => console.log(err))

      console.log(parti)
      res.status(200).json(newPart);

      
    
    } else {
      res.status(403);
    }
  }
});
module.exports = router;
