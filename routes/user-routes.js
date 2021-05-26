const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");

// create user
router.post("/api/createUser", async (req, res) => {
  const hashPass = bcrypt.hashSync(req.body.password, saltRounds);

  const data = await db.User.create({
    firstandlast: req.body.firstandlast,
    username: req.body.username,
    email: req.body.email,
    password: hashPass,
  }).catch((err) => res.status(409).send("Failed. Please check to make sure you have a valid email, no empty fields and if that is all good then try a different username.").end());

  res.status(200).send("Account Created!");
});

// user login
router.post("/login", async (req, res) => {
  const data = await db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).catch((err) => res.status(409).send(err));

  const match = await bcrypt.compareSync(req.body.password, data.password);

  if (match) {
    jwt.sign(
      {
        username: data.username,
        id: data.id,
        firstandlast: data.firstandlast
      },
      process.env.JWS_TOKEN,
      { expiresIn: "1hr" },
      (err, token) => {
        if (err) {
          res.status(401).send("Error connecting token");
        }

        res.json({ token, user: data.firstandlast, id: data.id });
      }
    );
  } else {
    res.status(401).send("No Such User!");
  }
});
// search for connection
router.get("/api/findFriends/:name", async (req, res) => {
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
      
      let returnedData = await db.User.findAll({
        where: {
          firstandlast: {
            [Op.substring]: "%" + req.params.name + "%",
          },
        },
        attributes: {
          exclude: [
            "password",
            "connections",
            "email",
            "createdAt",
            "updatedAt",
            "username",
          ],
        },
      }).catch((err) => res.json(err));
      
      res.status(200).json(returnedData);
    } else {
      res.status(403);
    }
  }
});

// add friend

router.put("/api/addFriend", async (req, res) => {

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
        res.status(401).json("Session Expired, please login!");
      } else {
        return data;
      }
    });
    
    if (data) {
      let returnedData = await db.User.findOne({
        where: {
          id: data.id,
        },
      }).catch((err) => res.json(err));
      await returnedData.addFriend(req.body.id).catch(err => res.status(403).json('Already a friend.'))
        res.status(200).json(`Connection Added!`);
    } else {
      res.status(401).json("Unable to verify current user. Please login.");
    }
  }
});

// get your friends
router.get("/api/getFriends", async (req, res) => {
  let token = false;
  if (!req.headers) {
    token = false;
  } else if (!req.headers.authorization) {
    token = false;
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(500).send("Authorization issue, create an account or Please Login");
  } else {
    const data = await jwt.verify(token, process.env.JWS_TOKEN, (err, data) => {
      if (err) {
        res.status(403).send("Authorization issue, create an account or Please Login").end();
      } else {
        return data;
      }
    });
    if (data) {
      let returnedData = await db.User.findOne({
        where: {
          id: data.id,
        },
      }).catch((err) => res.send("Issue retrieving current friends"));


      let returnFriends = await returnedData.getFriends({attributes: {
        exclude: [
          "password",
          "connections",
          "email",
          "createdAt",
          "updatedAt",
          "username",
        ],
      }})
      res.status(200).json(returnFriends)
    } else {
      res.status(403);
    }
  }
});


router.get("/api/searchCurrentFriends/:name", async (req, res) => {
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
      let returnedData = await db.User.findOne({
        where: {
          id: data.id,
        }
      }).catch((err) => res.json(err));


      let returnFriends = await returnedData.getFriends({
        where:{
          firstandlast:{
          [Op.substring] : req.params.name
          }
        },
        attributes: {
        exclude: [
          "password",
          "connections",
          "email",
          "createdAt",
          "updatedAt",
          "username",
        ],
      }})
     
      res.status(200).json(returnFriends)
    } else {
      res.status(403);
    }
  }
});


module.exports = router;
