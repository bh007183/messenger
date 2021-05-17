const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models")
require("dotenv").config()

const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  },
  path: "/messageRelay"
})



// Sets up the Express App
var PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var corsOptions = {
//   origin: 'https://bjh-hop-estore.herokuapp.com'
// }
// corsOptions
app.use(cors());

// Static directory
app.use(express.static("public"));
/////////////////////////////////
const userRouter = require("./routes/user-routes.js")
const messageRouter = require("./routes/message-routes.js")
const conversationRouter = require("./routes/conversation-routes.js");


// Routes
// =============================================================
app.use(userRouter)
app.use(messageRouter)
app.use(conversationRouter)
// Syncing our sequelize models and then starting our Express app
// =============================================================

// Sockets

io.on('connection', (socket) => {
  console.log(socket.handshake.headers.host)
  socket.on("message", (data) => {
    socket.send(JSON.parse(data)); // Send message to sender
    socket.broadcast.emit("emit", JSON.parse(data));
  })
  
})

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"))
// })
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
db.sequelize.sync({ force: false}).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});

