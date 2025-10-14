import express from "express";
import {
  getUsers,
  getUserbyId,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserbyId);
router.post("/", createUser);

export default router;
