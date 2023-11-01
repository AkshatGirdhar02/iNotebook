//Need to create a state which can be used by other components directly without prop drilling
import { useState } from "react";
import NoteContext from "./noteContext";
// require("dotenv").config();

const NoteState = (props) => {
  //   const s1 = {
  //     name: "Akshat",
  //     class: "4d",
  //   };

  //   const [state, setState] = useState(s1);
  //   const update = () => {
  //     setTimeout(() => {
  //       setState({
  //         name: "Ram",
  //         class: "5e",
  //       });
  //       //Update the state after 1 sec
  //     },1000);
  //   };

  // const host = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}`;
  const host="https://i-notebook-sepia.vercel.app";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //Need to do api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGVhNDE3N2YxN2U5OTA2NzU5ZTBmIn0sImlhdCI6MTY5ODU5NjgwMH0.Ch3EF3qtFthyubWq4EBoMREw4B1XsYPHnHE7Ibcrw7(temp)E",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);

    // console.log("Adding a new note");
    // const note = {
    //   _id: "653f5f05fc32b091c71106945",
    //   user: "653dea4177f17e9906759e0f",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2023-10-30T07:45:09.497Z",
    //   __v: 0,
    // };
    // setNotes(notes.concat(note));
  };

  //Add a note
  const addNote = async (title, description, tag="default") => {
    //Need to do api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    // const json = await response.json();
    // console.log(json);

    // console.log("Adding a new note");
    // if (tag.length === 0) {
    //   tag = "default";
    // }

    //So now the note will be returned by the response 
    const note=await response.json();
    // const note = {
    //   _id: "653f5f05fc32b091c71106945",
    //   user: "653dea4177f17e9906759e0f",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2023-10-30T07:45:09.497Z",
    //   __v: 0,
    // };
    setNotes(notes.concat(note));
    //After every manipulation,we need to get all the notes
    getNotes();
  };

  //Delete a note
  //used in NoteItem.js
  const deleteNote = async (id) => {
    // console.log(id);
    //Need to do api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    // console.log(json);

    // console.log("Deleting the node with id ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Update a note
  const editNote = async (id, title, description, tag) => {
    //Need to make api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    // console.log(json);

    //Iterate over all notes present in the database//id->653f3fba03e1a746f825f00e
    for (let index = 0; index < notes.length; index++) {
      //element variable will represent each note present in database
      const element = notes[index];

      //If the note belongs to the same user who created it and wants to update it
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        //At once we can update a single note,once we found that note and update it,break
        break;
      }
    }
    //setNotes(note)
    getNotes();
  };

  return (
    //The value of the state can be used by anyone which will be wrapped within NoteState
    // <NoteContext.Provider value={{state,update}}>{props.children}</NoteContext.Provider>
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
