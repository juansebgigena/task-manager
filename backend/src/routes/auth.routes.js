import express from "express";
import validateMiddleware from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createUserSchema, loginSchema } from "../validations/auth.validation.js";
import { createUser, loginUser, logoutUser, verifyToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateMiddleware(createUserSchema), createUser);
router.post("/login", validateMiddleware(loginSchema), loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/verify", authMiddleware, verifyToken);

export default router;
