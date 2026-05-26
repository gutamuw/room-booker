import { Response } from "express";
import { AuthRequest } from "../middleware/auth.mts";
import { VALID_SLOTS } from "../constants.mts";
import * as bookingService from "../services/bookingService.mts";

export const getMyBookings = async (req: AuthRequest, res: Response) => {
    const userId = req.uid;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const bookings = await bookingService.getBookingsForUser(userId);
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAvailability = async (_req: AuthRequest, res: Response) => {
    try {
        const payload = await bookingService.getAvailability();
        res.status(200).json(payload);
    } catch (error) {
        console.error("Error fetching availability:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createBooking = async (req: AuthRequest, res: Response) => {
    const { roomId } = req.params;
    const { date, slot } = req.body;
    const userId = req.uid;

    if (!roomId || !userId || !date || slot === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!VALID_SLOTS.includes(slot)) {
        return res.status(400).json({ message: "Invalid slot. Must be between 8 and 16" });
    }

    try {
        const alreadyBooked = await bookingService.isSlotTaken(roomId, date, slot)
        if (alreadyBooked) {
            return res.status(400).json({ message: "Room is not available for the selected slot" });
        }

        const newBooking = await bookingService.createBooking(roomId, userId, date, slot);
        res.status(201).json(newBooking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteBooking = async (req: AuthRequest, res: Response) => {
    const id = req.params.id;

    try {
        await bookingService.deleteBookingById(id);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
