const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const session = require("express-session");

const users = require("./routes/api/users");
const items = require("./routes/api/items");
const admin = require("./routes/api/admin");

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "oiu03090vewrdgfavg9a7098702sad",
    resave: false
  })
);

//serve index.html in angular
app.use(express.static(__dirname + "../../client/dist/client"));

//database config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//passport Middleware
app.use(passport.initialize());

//passport Config
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/items", items);
app.use("/api/admin", admin);

//server angular app if no other routes are hit
app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("../client/dist/client/index.html"));
});

const port = 8000;

app.listen(port, () => console.log(`listening on port ${port}`));
