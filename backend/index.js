const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
require("dotenv").config();

//This function will ensure that the server is connected to the database
connectToMongo();
//Used to create a web server
const app = express();
//Specify the port on which server will run
const port = process.env.REACT_APP_PORT;

//For fetching data through api,need to use cors
app.use(cors())

//Creating routes
//Whenever user will go to localhost:3000,Hello World! will be shown to the user
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//To parse json data
//express.json() is used to return json output to the user
app.use(express.json());

//Other routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/login", (req, res) => {
  res.send("Login page!!");
});

//To ensure that web server is active on the specified port
app.listen(port, () => {
  console.log(`iNotebook backend listening on at http://localhost:${port}`);
});
