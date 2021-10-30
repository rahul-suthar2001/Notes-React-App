const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    // console.log(notes);
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.post(
  "/addnote",
  fetchuser,
  [
    body("tag", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);
//router -3 update note
router.put("/update/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  try {
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found");
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not access");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

//router -4 delete
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found");
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not access");
    }
    await Note.deleteOne({ _id: req.params.id });
    res.json({ sucess: "Note Deleted ", note: note });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
