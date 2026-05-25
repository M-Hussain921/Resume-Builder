import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true, 
      trim: true,
    },
    phone: {
      type: String,
      required: false, 
    },
    location: {
      city: String,
      state: String,
    },
    linkedInUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);