import mongoose, { Schema } from "mongoose";
const tokenSchema = new Schema(
  {
    token: { type: String, unique: true },
  },
  { timestamps: false }
);

export default mongoose.model("RefreshToken", tokenSchema, "tokens");
