import { Response } from "express";
import { AuthRequest } from "../middleware/auth.mjs";
import { findOrCreateUser, findUserByUid } from "../services/userService.mjs";

export async function login(req: AuthRequest, res: Response) {
    try {
        const { name, email } = req.body;
        const user = await findOrCreateUser(req.uid!, name, email);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function me(req: AuthRequest, res: Response) {
    try {
        const user = await findUserByUid(req.uid!);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
