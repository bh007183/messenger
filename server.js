const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const http = require("http");
const server = http.createServer(app);

// 'https://messenger-improved-bjh.herokuapp.com'

// Sets up the Express App
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// var corsOptions = {
//   origin: 'https://messenger-improved-bjh.herokuapp.com'
// }
// corsOptions
app.use(cors());

// Static directory

/////////////////////////////////
const userRouter = require("./routes/user-routes.js");
const messageRouter = require("./routes/message-routes.js");
const conversationRouter = require("./routes/conversation-routes.js");

// Routes
// =============================================================
app.use(userRouter);
app.use(messageRouter);
app.use(conversationRouter);
// Syncing our sequelize models and then starting our Express app
// =============================================================

// Sockets
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  path: "/messageRelay",
});

const users = [];
io.on("connection", async (socket) => {
  let token = false;
  if (!socket.handshake.headers) {
    token = false;
  } else if (!socket.handshake.headers.authorization) {
    token = false;
  } else {
    token = socket.handshake.headers.authorization.split(" ")[1];
  }
  if (!token) {
    console.log("error with token line 65 on server");
    socket.disconnect();
  } else {
    const data = await jwt.verify(token, process.env.JWS_TOKEN, (err, data) => {
      if (err) {
        console.log("error with token line 70 on server");
      } else {
        return data;
      }
    });
    if (data) {
      let results = await db.User.findOne({
        where: {
          id: data.id,
        },
      }).catch((err) => console.log(err));
      let assoc = await results.getConversations();

      socket.on("create", function (room) {
        for (let i = 0; i < assoc.length; i++) {
          if (assoc[i].id === parseInt(room)) {
            socket.join(room);
            console.log(io.sockets.adapter.rooms.get(room));
            break;
          }
        }
      });

      socket.on("message", (data) => {
        let parsedData = JSON.parse(data);
        console.log(parsedData);
        socket.send(parsedData);
        socket.broadcast
          .to(parseInt(parsedData.ConversationId))
          .emit("emit", parsedData);
      });

      socket.on("leave", (data) => {
        console.log(io.sockets.adapter.rooms.get(data));
        console.log("lin 86 in server file");
        socket.leave(data);
      });
      socket.on("disconnect", (reason) => {
        console.log(reason);
        console.log("disconect working")

  
      });
    } else {
      console.log("error with token line 94 on server");
      socket.disconnect();
    }
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
  console.log(__dirname, "../client/build/index.html");
});
// db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
// .then(function(){
//     return db.sequelize.sync({ force: true });
// })
// .then(function(){
//     return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
// })
// .then(function(){
//     console.log('Database synchronised.');
// }, function(err){
//     console.log(err);
// });
// Change force: to true if it's cool for the site to remove database items.
db.sequelize.sync({ force: false }).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});
