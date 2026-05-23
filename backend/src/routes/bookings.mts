import { Router } from "express";
import Booking from "../models/booking.mts";
import { createBooking, getAllBookingsByRoomId } from "../controllers/bookingController.mts";

const router = Router();

// get all bookings for a room
router.get("/:roomId", getAllBookingsByRoomId);

// create booking
router.post("/:roomId", createBooking);

// delete booking
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: "Booking deleted successfully" });

    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }

});

export default router;
