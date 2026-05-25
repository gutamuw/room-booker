import { Router } from "express";
import { verifyToken } from "../middleware/auth.mjs";
import { login, me } from "../controllers/userController.mjs";

const router = Router();

router.post("/login", verifyToken, login);
router.get("/me", verifyToken, me);

export default router;
