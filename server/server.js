const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const items = require("./routes/api/items");

const app = express();

//database config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello"));

//Use Routes
app.use("/api/users", users);
app.use("/api/items", items);

const port = 8000;

app.listen(port, () => console.log(`listening on port ${port}`));
