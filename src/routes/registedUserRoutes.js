import express from "express";
import {
  getRegistedUsers,
  register,
  deleteRegistedUser,
  login,
} from "../controllers/registedUserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getRegistedUsers);
router.post("/", authMiddleware, register);
router.delete("/", authMiddleware, deleteRegistedUser);
router.post("/login", login);

export default router;
