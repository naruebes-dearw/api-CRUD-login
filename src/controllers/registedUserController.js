import User from "../models/registedUserModel.js";
import bcrypt from "bcrypt";

// Get all users
export const getRegistedUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) res.status(404).json("Users not found");
    res.json(users);
  } catch (err) {
    res.json({ Error: err.message });
  }
};

const hashing = (password) => {
  return bcrypt.hash(toString(password), 10);
};

// Register
export const register = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ message: "input is empty" });
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email or Password is empty" });
    const hashedPassword = await hashing(password);
    const user = new User({ email, hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.json({ Error: err.message });
  }
};

// Delete user
export const deleteRegistedUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });
    res.json({ user, message: "User deleted" });
  } catch (err) {
    res.json({ Error: err.message });
  }
};
