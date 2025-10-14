import User from "../models/userModel.js";

// GET all users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET user by ID
export const getUserbyId = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
}

// POST new user
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE user by ID

// DELETE user by ID