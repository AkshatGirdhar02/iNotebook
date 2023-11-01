const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all notes using GET: /api/notes/fetchallnotes. Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    //req.user contains the information of data.user which is found in fetchuser()
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error ");
  }
});

//ROUTE 2: Add a new note using POST: /api/notes/addnote. Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({min: 5}),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //If the above validation checks are not satisfied,we will not add a new note
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
      }

      // console.log(req.user.id);
      //If there is no validation error,we will create a new note
      const note = await new Note({
        //Here the field name should be same as that in Notes schema
        user: req.user.id,
        title,
        description,
        tag,
      });

      //Now we will save this note in the database
      //save() returns a promise
      const savedNote = await note.save();
      res.json(savedNote);

      //req.user contains the information of data.user which is found in fetchuser()
      // const notes = await Notes.find({ user: req.user.id });
      // res.json([notes]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occurred");
    }
  }
);

//ROUTE 3: Update an existing note using: PUT /api/notes/updatenode. Login required
//Here id is the id of the note that we want to update
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //Now we will create a new Note object
    const newNote = {};
    //If user wants to update the title
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Now we will create the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not Found");
    }

    //Allow updation only if user owns this note
    //Since user id is also present in the note itself,so used note.user.toString()
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //Finds the note by id and updates it
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    //Sends the updated note as the response
    res.json(note);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4: Delete an existing node using: DELETE /api/notes/deletenode. Login required
//Here id is the id of the note that we want to delete
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Now we will create the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not Found");
    }

    //Allow deletion only if user owns this note
    //Since user id is also present in the note itself,so used note.user.toString()
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //Finds the note using the id and deletes it
    note = await Note.findByIdAndDelete(req.params.id);

    //Returns a json which contains this Success message and the note which was deleted
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
