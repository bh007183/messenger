const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");

router.post("/api/conversation", async (req, res) => {
  let data = await db.Conversation.create(req.body).catch((err) =>
    res.status(401).send(err)
  );
   await data.setUsers(data.UserId)
 
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
      console.log(data.id + "line 36")
      let postedData = await db.Conversation.findAll({
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

module.exports = router;