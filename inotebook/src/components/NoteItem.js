import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const handleClick = () => {
    // console.log("id is ", note._id);
    deleteNote(note._id);
  };

  return (
    <div className="col-md-3 my-3 ">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash-can mx-2" onClick={handleClick}></i>
            <i
              className="fa-solid fa-pen-to-square"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};
