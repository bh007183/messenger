const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");

router.post("/api/sendmessage", async (req, res) => {
  console.log(req.body)
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
      
      let postedData = await db.Message.create(req.body).catch((err) => res.json(err));
      console.log(postedData)
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

module.exports = router;
