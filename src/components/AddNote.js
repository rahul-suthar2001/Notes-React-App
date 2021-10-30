import React, { useState, useContext } from "react";
import NoteContext from "../context/noteContext";

const Addnote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: " ",
    description: " ",
    tag: "general",
  });
  const handleClick = (e) => {
    e.preventDefault();
     
    addNote(note.title, note.description, note.tag);
    setNote({  title: " ",
    description: " ",
    tag: " ",})
    props.showAlert("New Note Added ","primary")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container">
        <h3 className="my-4 fw-bold fst-italic">Add Note</h3>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control my-2"
              id="title"
              name="title"
              aria-describedby="title"
              placeholder="Enter title"
              onChange={onChange}
              value={note.title}
             />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control my-2"
              id="description"
              name="description"
              placeholder="description"
              onChange={onChange}
              value={note.description}
              />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control my-2"
              id="tag"
              name="tag"
              value={note.tag}
              placeholder="tag"
              onChange={onChange}
            />
          </div>
          <button
          disabled = {note.title.length <5 || note.description.length<5}
            type="submit"
            className="btn btn-primary my-3"
            onClick={handleClick}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
