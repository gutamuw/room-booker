import { Schema, model, Document, Types } from "mongoose";

export interface IBooking extends Document {
    roomId: Types.ObjectId,
    userId: string,
    startTime: Date,
    endTime: Date,
}

const bookingSchema = new Schema<IBooking>({
    roomId: {type: Schema.Types.ObjectId, required: true, ref: "Room"},
    userId: {type: String, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true}
})

const Booking = model<IBooking>("Booking", bookingSchema)
export default Booking