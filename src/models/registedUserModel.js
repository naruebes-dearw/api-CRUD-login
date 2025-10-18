import mongoose from "mongoose";

const registedUserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  hashedPassword: String,
});

export default mongoose.model("registed_user", registedUserSchema);
