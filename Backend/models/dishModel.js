const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dish", dishSchema);
