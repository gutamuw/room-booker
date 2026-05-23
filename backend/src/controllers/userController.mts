import { Response } from "express";
import { AuthRequest } from "../middleware/auth.mjs";
import { findOrCreateUser } from "../services/userService.mjs";

export async function login(req: AuthRequest, res: Response) {
    try {
        const { name, email } = req.body;
        const user = await findOrCreateUser(req.uid!, name, email);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
