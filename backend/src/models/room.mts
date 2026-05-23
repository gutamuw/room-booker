import { Schema, model, Document } from "mongoose";

export interface IRoom extends Document {
    name: string,
    capacity: number
}

const roomSchema = new Schema<IRoom>({
    name: {type: String, required: true},
    capacity: {type: Number, required: true}
})

const Room = model<IRoom>("Room", roomSchema)
export default Room