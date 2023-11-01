const mongoose = require("mongoose");
require("dotenv").config();
// const mongoURI = "mongodb://127.0.0.1:27017/inotebook";
// const mongoURI="mongodb+srv://Akshat02:v3EJFsl3Yu6Ud12u@cluster0.bb5wxqk.mongodb.net/inotebook"
const mongoURI=process.env.REACT_APP_MONGODB_URL

// connectToMongo().catch((err) => {
//   console.log("Error is: ", err);
// });

async function connectToMongo() {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Successfully connected to MongoDB!!");
    })
    .catch((err) => console.log(err));
}

module.exports = connectToMongo;
