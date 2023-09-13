const Room = require("../models/Room");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");

const roomController = require("express").Router();

// get all
roomController.get("/", async (req, res) => {
  try {
    const type = req.query.type;
    let rooms;
    if (type) {
      rooms = await Room.find({ type: type }).limit(15);
    } else {
      rooms = await Room.find({}).limit(15);
    }

    return res.status(200).json(rooms);
  } catch (error) {
    console.log(error.message);
  }
});

// get oneroom
roomController.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findById(id);

    return res.status(200).json(room);
  } catch (error) {
    console.log(error.message);
  }
});

// create
roomController.post("/", verifyTokenAdmin, async (req, res) => {
  try {
    const createdRoom = await Room.create(req.body);
    return res.status(201).json(createdRoom);
  } catch (error) {
    console.log(error.message);
  }
});

// update
roomController.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedRoom);
  } catch (error) {
    console.log(error.message);
  }
});

// delete
roomController.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Successfully Deleted Room" });
  } catch (error) {
    console.log(error.message);
  }
});

// book
roomController.put("/bookRoom/:id", verifyToken, async (req, res) => {
  try {
    const { unavailableDates } = req.body;
    const room = await Room.findById(req.params.id);

    room.unavailableDates = room.unavailableDates.concat(unavailableDates);
    await room.save();

    return res.status(200).json(room);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = roomController;
