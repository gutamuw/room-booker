import { Request, Response } from "express";
import Booking from "../models/booking.mts";

export const getAllBookingsByRoomId = async (req: Request, res: Response) => {
const { roomId } = req.params;
    try {
        const bookings = await Booking.find({ roomId });
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const createBooking = async (req: Request<{ roomId: string }, { userId: string; startTime: string; endTime: string }>, res: Response) => {

const { roomId } = req.params;
const { userId, startTime, endTime } = req.body;

if (!roomId || !userId || !startTime || !endTime) {
  return res.status(400).json({ message: "All fields are required" });
}

try {
    const alreadyBooked = await Booking.findOne({
        roomId,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
    });

    if(alreadyBooked) {
        return res.status(400).json({ message: "Room is not available for the selected time slot" });
    }
    const newBooking = await Booking.create({ roomId, userId, startTime, endTime });

    res.status(201).json(newBooking);
    
} catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
}


}

export const deleteBooking = async (req: Request<{ id: string }>, res: Response) => {

    

}