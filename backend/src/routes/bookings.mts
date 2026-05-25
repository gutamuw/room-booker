import { Router } from "express";
import Booking from "../models/booking.mts";
import { createBooking, deleteBooking, getAllBookings, getAllBookingsByRoomId } from "../controllers/bookingController.mts";
import { verifyToken } from "../middleware/auth.mts";

const router = Router();

router.get("/", verifyToken, getAllBookings);

// get all bookings for a room
router.get("/:roomId", verifyToken ,getAllBookingsByRoomId);

// create booking
router.post("/:roomId", verifyToken, createBooking);

// delete booking
router.delete("/:id", verifyToken, deleteBooking)

export default router;
