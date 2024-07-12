const User = require("../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  user.passwordConfirm = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 200, res);
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new Error("Please provide email and password");

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError("Incorrect email or password", 401));

    createSendToken(user, 200, res);
  } catch (error) {
    res.status().json({
      error: error.message,
      error: error.stack,
    });
  }
};
