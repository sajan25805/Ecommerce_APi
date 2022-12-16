import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // , toJSON: { getters: true }, id: false
  }
);

export default mongoose.model("Product", productSchema, "products");
