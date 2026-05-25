import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase.mjs";

export interface AuthRequest<P = Record<string, string>> extends Request<P> {
    uid?: string;
}

export async function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.uid = decoded.uid;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
}
