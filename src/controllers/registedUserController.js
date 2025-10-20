import User from "../models/registedUserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const verifyEmailAndPassword = (email, password) => {
  if (!email || !password) throw new Error("Email or Password is empty");
  return;
};

// Register
export const register = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    verifyEmailAndPassword(email, password);
    const hashedPassword = await bcrypt.hash(String(password), 10);
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

// Verify password - return Promise
const verifyPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    verifyEmailAndPassword(email, password);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isCorrectPassword = await bcrypt.compare(
      String(password),
      user.hashedPassword
    );
    if (!isCorrectPassword)
      return res.status(400).json({ message: "Password is incorrect" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};
