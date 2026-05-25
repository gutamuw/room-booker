import { Response } from "express";
import Booking, { IBooking } from "../models/booking.mts";
import { IRoom } from "../models/room.mts";
import { AuthRequest } from "../middleware/auth.mts";
import { GetAllBookingsDto } from "../dtos/bookingDto.mts";

export const getAllBookings = async (_req: AuthRequest, res: Response) => {
    try {
        const bookings = await Booking.find().populate<{ roomId: IRoom }>("roomId");

        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        const bookingsTransformed: GetAllBookingsDto = {
            bookings: bookings.map(b => ({
                roomName: b.roomId.name,
                capacity: b.roomId.capacity,
                userId: b.userId,
                date: b.date,
                slot: b.slot,
            })),
        };

        res.status(200).json(bookingsTransformed);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllBookingsByRoomId = async (req: AuthRequest, res: Response) => {
const { roomId } = req.params;
    try {
        const bookings = await Booking.find({ roomId }).populate<{ roomId: IRoom }>("roomId");
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

const VALID_SLOTS = [8, 9, 10, 11, 12, 13, 14, 15, 16];

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
        const alreadyBooked = await Booking.findOne({ roomId, date, slot });

        if (alreadyBooked) {
            return res.status(400).json({ message: "Room is not available for the selected slot" });
        }

        const newBooking = await Booking.create({ roomId, userId, date, slot });
        res.status(201).json(newBooking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteBooking = async (req: AuthRequest, res: Response) => {
    const id = req.params.id;
    
    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: "Booking deleted successfully" });
    
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}