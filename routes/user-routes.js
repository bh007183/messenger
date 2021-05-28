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
    image: req.body.image
  }).catch((err) => {if(err.errors[0].message.substring(0, 6) === "users."){res.status(409).send(err.errors[0].message.substring(6))} else{res.status(409).send("invalid email")} })

  res.status(200).send("Account Created!");
});

// user login
router.post("/login", async (req, res) => {
  const data = await db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).catch((err) => res.status(409).send("No Known User!"));

  try{
    const match = await bcrypt.compareSync(req.body.password, data.password)
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
            res.status(401).send("Error connecting token. Try again.");
          }
  
          res.json({ token, user: data.firstandlast, id: data.id });
        }
      );
    } else {
      res.status(401).send("No Such User!");
    }
  
  }catch(err){
    res.status(401).send("Invalid Credientials, Please try again or create an account.")
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
    res.status(500).send("Please Login");
  } else {
    const data = await jwt.verify(token, process.env.JWS_TOKEN, (err, data) => {
      if (err) {
        res.status(403).send("Session Expired. Please Login.");
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
      }).catch((err) => res.status(401).send("Issue finding friends. "));
      
      res.status(200).json(returnedData);
    } else {
      res.status(403).send("Session Expired. Please Login.");
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
    res.status(500).send("Please Login.");
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
      }).catch((err) => res.status(401).send("Authentication issue, Please Login."));
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
        res.status(403).send("Session Expired. Please Login").end();
      } else {
        return data;
      }
    });
    if (data) {
      let returnedData = await db.User.findOne({
        where: {
          id: data.id,
        },
      }).catch((err) => res.status(401).send("Validation expired"));


      let returnFriends = await returnedData.getFriends({attributes: {
        exclude: [
          "password",
          "connections",
          "email",
          "createdAt",
          "updatedAt",
          "username",
        ],
      }}).catch(err => res.status(401).send("Issue retrieving friends"))
      res.status(200).json(returnFriends)
    } else {
      res.status(403).send("Session Expired. Please Login");
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
    res.status(500).send("Please Login");
  } else {
    const data = await jwt.verify(token, process.env.JWS_TOKEN, (err, data) => {
      if (err) {
        res.status(403).send("Session Expired. Please Login").end();
      } else {
        return data;
      }
    });
    if (data) {
      let returnedData = await db.User.findOne({
        where: {
          id: data.id,
        }
      }).catch((err) => res.status(404).send("Validation Issue"));


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
      }}).catch((err) => res.status(404).send("Issue Finding Friends"))
     
      res.status(200).json(returnFriends)
    } else {
      res.status(403).send("Session Expired");
    }
  }
});

router.get("/api/manageAccount", async (req, res) => {
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
        res.status(403).send("Session Expired. Please Login").end();
      } else {
        return data;
      }
    });
    if (data) {
      let userData = await db.User.findOne({
        where: {
          id: data.id,
        },
        attributes: {exclude: ['password']}
      }).catch((err) => res.status(404).send("Validation Issue"));
     
      res.status(200).json(userData)
    } else {
      res.status(403).send("Session Expired");
    }
  }
});

router.delete("/api/deleteUser", async (req, res) => {
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
        res.status(403).send("Session Expired. Please Login").end();
      } else {
        return data;
      }
    });
    if (data) {
      let userData = await db.User.destroy({
        where: {
          id: data.id,
        }
      }).catch((err) => res.status(404).send("Validation Issue, unable to delete user at this time."));
     
      res.status(200).json(userData)
    } else {
      res.status(403).send("Session Expired");
    }
  }
});


module.exports = router;
