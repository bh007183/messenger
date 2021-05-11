const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config()

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

// Routes
// =============================================================
app.use(userRouter)
app.use(messageRouter)
// Syncing our sequelize models and then starting our Express app
// =============================================================

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"))
// })

// Change force: to true if it's cool for the site to remove database items.
db.sequelize.sync({ force: false}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});