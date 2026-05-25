import { Schema, model, Document, Types } from "mongoose";

export interface IBooking extends Document {
    room: Types.ObjectId,
    userId: string,
    date: Date,
    slot: number,
}

const bookingSchema = new Schema<IBooking>({
    room: {type: Schema.Types.ObjectId, required: true, ref: "Room"},
    userId: {type: String, required: true},
    date: {type: Date, required: true},
    slot: {type: Number, required: true}
})

const Booking = model<IBooking>("Booking", bookingSchema)
export default Booking