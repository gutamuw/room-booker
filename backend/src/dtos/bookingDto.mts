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
