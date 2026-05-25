import User from "../models/user.mjs";

export async function findOrCreateUser(uid: string, name: string, email: string) {
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
        user = await User.create({ firebaseUid: uid, name, email });
    }

    return user;
}

export async function findUserByUid(uid: string) {
    return User.findOne({ firebaseUid: uid });
}
