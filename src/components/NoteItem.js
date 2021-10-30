import React, { useContext } from "react";
import NoteContext from "../context/noteContext";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <span className="badge bg-dark">{note.tag}</span>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>

          <p className="card-text">{note.description}</p>
          <i
            className="far fa-edit mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <i
            className="fas fa-trash-alt mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Note Deleted ","success");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
