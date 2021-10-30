import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import NoteContext from "../context/noteContext";
import Addnote from "./AddNote";
import Noteitem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
      
    }else{
      history.push('/login');
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [note, setNote] = useState({
    id: "",
    etitle: " ",
    edescription: " ",
    etag: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    console.log("updating notes ..");
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note Updated ","info")
    console.log("updated note");
    refClose.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote showAlert={props.showAlert}/>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content container">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="etitle">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby="title"
                  placeholder="Enter title"
                  onChange={onChange}
                  value={note.etitle}
                  minLength={5}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edescription">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  placeholder="description"
                  onChange={onChange}
                  value={note.edescription}
                  minLength={5}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="etag">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  placeholder="tag"
                  onChange={onChange}
                  value={note.etag}
                />
              </div>
            </form>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update notes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container row my-3">
        <h3 className="my-4 fw-bold">Your Notes</h3>
        <div className="container fst-italic">
          {notes.length === 0 && "No notes to display "}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
