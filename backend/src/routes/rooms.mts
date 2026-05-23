import { Router } from "express";
import Room from "../models/room.mts";

const router = Router();

// Get all rooms
router.get("/", async (req, res) => {
    const rooms = await Room.find()
    res.json(rooms)
});

// Get room by id
router.get("/:id", (req, res) => {});

// Create room 
router.post("/", async (req, res) => {

//TODO: move to controller and service layer 
const { name, capacity } = req.body;
if (!name || !capacity) {
  return res.status(400).json({ message: "Name and capacity are required" });
}

const newRoom = await Room.create({ name, capacity });
res.status(201).json(newRoom);

});

// Update room
router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Room ID is required" });
    }

    try {
        await Room.findByIdAndDelete(id);
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
