import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already exists"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;