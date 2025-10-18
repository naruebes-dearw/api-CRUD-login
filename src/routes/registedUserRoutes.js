import express from "express";
import {
  getRegistedUsers,
  register,
  deleteRegistedUser,
} from "../controllers/registedUserController.js";

const router = express.Router();

router.get("/", getRegistedUsers);
router.post("/", register);
router.delete("/", deleteRegistedUser);

export default router;
