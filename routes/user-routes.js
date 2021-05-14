const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");

router.post("/api/createUser", async (req, res) => {
  const hashPass = bcrypt.hashSync(req.body.password, saltRounds);
 
    const data =  await db.User.create({
      firstandlast: req.body.firstandlast,
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    }).catch(err => res.status(409).json(err).end());
    
   res.status(200).json(data.username);
    
  
});


router.post("/login", async (req, res) => {
  const data = await db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).catch((err) => res.status(409).send(err));

  const match = await bcrypt.compareSync(req.body.password, data.password)

    if(match){
      jwt.sign(
        {
          username: data.username,
          id: data.id,
        },
        process.env.JWS_TOKEN,
        { expiresIn: "1hr" },
        (err, token) => {
          if (err) {
            
            res.status(401).send("Error connecting token");
            
          }
        
          res.json({ token, user: data.firstandlast, id: data.id });
        }
      )

    }else{
      res.status(401).send("No Such User!")
    }

   
  
});

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
  console.log(data)
  if (data) {
    console.log(data)
    let returnedData = await db.User.findAll({
      where:{
        firstandlast: {
          [Op.substring]: "%" + req.params.name + "%"
        }
      },
      attributes: {exclude: ["password", "connections", "email", "createdAt", "updatedAt", "username"]}
    }).catch((err) => res.json(err));
    console.log(returnedData)
    res.status(200).json(returnedData)
    
    
  } else {
    res.status(403);
  }
}
});

router.put("/api/addFriend", async (req, res) => {
  console.log(req.body)
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
  console.log(data)
  if (data) {
    let returnedData = await db.User.findOne({
      where:{
        id: data.id
      },
    }).catch((err) => res.json(err));
    let updatedVal = returnedData.update({
      connections: returnedData.connections + "a" + req.body.id + "a"
    }).catch((err) => res.json(err));
    console.log(updatedVal)
    // res.status(200).json(returnedData)
    
    
  } else {
    res.status(403);
  }
}
});

module.exports = router;
