const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema);
