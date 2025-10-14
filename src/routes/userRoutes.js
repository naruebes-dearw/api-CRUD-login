import express from "express";
import {
  getUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserbyId);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
