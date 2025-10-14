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
};

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

// UPDATE user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        email: req.body.email,
      },
      req.body,
      {
        new: true,
      }
    );
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      email: req.body.email,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
