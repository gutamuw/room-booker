import { Router } from "express";
import { verifyToken } from "../middleware/auth.mjs";
import { login } from "../controllers/userController.mjs";

const router = Router();

router.post("/login", verifyToken, login);

export default router;
