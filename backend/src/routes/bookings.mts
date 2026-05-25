import { Router } from "express";
import Booking from "../models/booking.mts";
import { createBooking, deleteBooking, getMyBookings, getAvailability } from "../controllers/bookingController.mts";
import { verifyToken } from "../middleware/auth.mts";

const router = Router();

// get all bookings for the authenticated user
router.get("/me", verifyToken, getMyBookings);

// availability across rooms within a date range
router.get("/availability", verifyToken, getAvailability);

// create booking
router.post("/:roomId", verifyToken, createBooking);

// delete booking
router.delete("/:id", verifyToken, deleteBooking)

export default router;
