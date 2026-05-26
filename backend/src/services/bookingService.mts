import Booking from "../models/booking.mts";
import Room, { IRoom } from "../models/room.mts";
import { GetAllBookingsDto, GetAvailabilityDto } from "../dtos/bookingDto.mts";
import { VALID_SLOTS } from "../constants.mts";
import { addDays, startOfDay } from "date-fns";
import { ymd } from "../utils/dateFormaters";

const DAYS_AHEAD = 30;

export async function getBookingsForUser(userId: string): Promise<GetAllBookingsDto> {
    const bookings = await Booking.find({ userId }).populate<{ room: IRoom }>("room");

    return {
        bookings: bookings.map(b => ({
            id: String(b._id),
            roomName: b.room.name,
            capacity: b.room.capacity,
            userId: b.userId,
            date: b.date,
            slot: b.slot,
        })),
    };
}

export async function getAvailability(): Promise<GetAvailabilityDto> {
    const from = startOfDay(new Date());
    const to = addDays(from, DAYS_AHEAD);
    //List of dates, one for each day in the range from "from" to "to"
    const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => ymd(addDays(from, i)));

    const [rooms, bookings] = await Promise.all([
        Room.find(),
        Booking.find({ date: { $gte: from, $lt: to } }),
    ]);

    return {
        from: ymd(from),
        to: ymd(to),
        rooms: rooms.map(room => {
            const roomBookings = bookings.filter(b => b.room.equals(room._id));
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
}

export async function isSlotTaken(roomId: string, date: string, slot: number) {
    return Boolean(await Booking.findOne({ room: roomId, date, slot }));
}

export async function createBooking(roomId: string, userId: string, date: string, slot: number) {
    return Booking.create({ room: roomId, userId, date, slot });
}

export async function deleteBookingById(id: string) {
    return Booking.findByIdAndDelete(id);
}
