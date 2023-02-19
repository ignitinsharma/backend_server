const express = require("express");
const { noteModel } = require("../Model/notes.model");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  const notes = await noteModel.find();
  res.send(notes);
});

noteRouter.post("/create", async (req, res) => {
  const data = req.body;
  try {
    const note = new noteModel(data);
    await note.save();
    res.send({ msg: "Notes created successfully" });
  } catch (err) {
    res.send({ msg: "notes not created" });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const updateddata = req.body;
  const note = await noteModel.findOne({ _id: ID });
  const userid_in_note = note.userID;
  const userid_making_req = req.body.userID;
  try {
    if (userid_making_req !== userid_in_note) {
      res.send({ msg: "you are not authorized" });
    } else {
      await noteModel.findByIdAndUpdate({ _id: ID }, updateddata);
      res.send({ msg: "updated the note" });
    }
  } catch (err) {
    res.send({ msg: "cannot modify", error: err.message });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  const note = await noteModel.findOne({ _id: ID });
  const userid_note = note.userID;
  const useridMakingReq = req.body.userID;
  try {
    if (useridMakingReq !== userid_note) {
      res.send({ msg: "you are not authorized" });
    } else {
      await noteModel.findByIdAndDelete({ _id: ID });
      res.send({ msg: "Deleted note" });
    }
  } catch (err) {
    res.send({ msg: "cannot delete", error: err.message });
  }
});

module.exports = {
  noteRouter,
};
