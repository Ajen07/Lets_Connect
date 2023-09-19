import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", TokenSchema);
