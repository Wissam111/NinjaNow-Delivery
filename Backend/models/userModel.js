const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
    },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (phone, password) {
  if (!phone || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ phone });
  if (!user) {
    throw Error("Incorrect Phone");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

userSchema.statics.signup = async function (fullName, phone, password) {
  if (!fullName || !phone || !password) {
    throw Error("All fields must be filled");
  }

  const exists = await this.findOne({ phone });
  if (exists) {
    throw Error("phone already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ phone, password: hash, fullName });
  return user;
};

module.exports = mongoose.model("User", userSchema);
