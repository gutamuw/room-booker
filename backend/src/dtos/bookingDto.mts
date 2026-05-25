export interface BookingDto {
    roomName: string;
    capacity: number;
    userId: string;
    date: Date;
    slot: number;
}

export interface GetAllBookingsDto {
    bookings: BookingDto[];
}

export interface DayAvailabilityDto {
    date: string; // YYYY-MM-DD
    availableSlots: number[];
}

export interface RoomAvailabilityDto {
    roomId: string;
    roomName: string;
    capacity: number;
    days: DayAvailabilityDto[];
}

export interface GetAvailabilityDto {
    from: string;
    to: string;
    rooms: RoomAvailabilityDto[];
}
