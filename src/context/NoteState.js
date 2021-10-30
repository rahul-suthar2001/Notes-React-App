import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialnote = [];

  const [notes, setnotes] = useState(initialnote);
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setnotes(json);
  };
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setnotes(notes.concat(note));
  };
  //Edit Note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/update/${id}`;
    await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // const json = await response.json();
    // console.log(json);
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setnotes(newNote);
  };

  //Delete Note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/delete/${id}`;
    await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
