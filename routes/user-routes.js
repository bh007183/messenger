const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const db = require("../models");

router.post("/api/createUser", async (req, res) => {
  const hashPass = bcrypt.hashSync(req.body.password, saltRounds);
 
    const data =  await db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    }).catch(err => res.status(404).json(err).end());
    res.status(200).json(data.username);
    
  
});


router.post("/login", async (req, res) => {
  const data = db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).catch((err) => res.status(409).send(err));
  if (bcrypt.compareSync(req.body.password, data.password) === true) {
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
        res.json({ token, user: data.username, id: data.id });
      }
    );
  } else {
    res.status(401).send("No such user!");
  }
});

module.exports = router;
