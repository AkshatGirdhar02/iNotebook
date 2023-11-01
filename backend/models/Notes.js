const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  //Need to link each note to a particular user
  //It is basically used as a foreign key
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Name of the folder is decided from here
module.exports = mongoose.model("notes", NotesSchema);
