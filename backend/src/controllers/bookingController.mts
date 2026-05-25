import { Response } from "express";
import Booking from "../models/booking.mts";
import { IRoom } from "../models/room.mts";
import { AuthRequest } from "../middleware/auth.mts";
import { GetAllBookingsDto, GetAvailabilityDto } from "../dtos/bookingDto.mts";
import { VALID_SLOTS } from "../constants.mts";
import Room from "../models/room.mts";
import { addDays, format, startOfDay } from "date-fns";

export const getMyBookings = async (req: AuthRequest, res: Response) => {
    const userId = req.uid;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const bookings = await Booking.find({ userId }).populate<{ roomId: IRoom }>("roomId");

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

const DAYS_AHEAD = 30;
const ymd = (d: Date) => format(d, "yyyy-MM-dd");

export const getAvailability = async (_req: AuthRequest, res: Response) => {
    try {
        const from = startOfDay(new Date());
        const to = addDays(from, DAYS_AHEAD);
        const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => ymd(addDays(from, i)));

        const [rooms, bookings] = await Promise.all([
            Room.find(),
            Booking.find({ date: { $gte: from, $lt: to } }),
        ]);

        const payload: GetAvailabilityDto = {
            from: ymd(from),
            to: ymd(to),
            rooms: rooms.map(room => {
                const roomBookings = bookings.filter(b => b.roomId.equals(room._id));
                return {
                    roomId: String(room._id),
                    roomName: room.name,
                    capacity: room.capacity,
                    days: dates.map(date => {
                        const bookedSlots = roomBookings
                            .filter(b => ymd(b.date) === date)
                            .map(b => b.slot);
                        return {
                            date,
                            availableSlots: VALID_SLOTS.filter(s => !bookedSlots.includes(s)),
                        };
                    }),
                };
            }),
        };

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