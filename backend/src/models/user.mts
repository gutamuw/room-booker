import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    firebaseUid: string,
    name: string,
    email: string,
}

const userSchema = new Schema<IUser>({
    firebaseUid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
})

const User = model<IUser>("User", userSchema)
export default User
