const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },

  { timestamps: true }
);

restaurantSchema.virtual("dishes", {
  ref: "Dish",
  localField: "_id",
  foreignField: "restaurant",
});

restaurantSchema.statics.signup = async function (email, password, name) {
  // validation
  if (!email || !password || !name) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const restaurant = await this.create({ email, password: hash, name });

  return restaurant;
};

restaurantSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const restaurant = await this.findOne({ email });
  if (!restaurant) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, restaurant.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return restaurant;
};

module.exports = mongoose.model("Restaurant", restaurantSchema);
