const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authControllers");

router.route("/signup").post(authController.signUp);

router.route("/signin").post(authController.signIn);

module.exports = router;
