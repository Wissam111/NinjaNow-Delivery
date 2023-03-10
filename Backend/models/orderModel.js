const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    status: {
      type: String,
      enum: ["PLACED", "PREPARING", "ONDELIVERY", "DELIVERED"],
      default: "PLACED",
    },
    address: {
      type: String,
      required: true,
    },
    dishes: {
      type: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
      required: true,
    },
    status_updates: [{ status: { type: String }, updatedAt: { type: Date } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
