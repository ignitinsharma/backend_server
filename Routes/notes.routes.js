const express = require("express");
const { noteModel } = require("../model/note.model");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try {
    const note = await noteModel.find();
    res.send(note);
  } catch (err) {
    res.send({
      msg: "something went wrong while getting notes",
      err: err.message,
    });
  }
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new noteModel(payload);
    await note.save();
    res.send("note is created");
  } catch (err) {
    res.send({ msg: "Note is not created", err: err.message });
  }
});

noteRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const note = await noteModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({
        msg: "you are not authorised to update this note",
        err: err.message,
      });
    } else {
      await noteModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "Note has been updated" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

noteRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const note = await noteModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({
        msg: "You are not authorised to delete this note",
        err: err.message,
      });
    } else {
      await noteModel.findByIdAndDelete({ _id: id });
      res.send({ msg: "Note has been deleted" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

module.exports = {
  noteRouter,
};
