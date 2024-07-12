const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authControllers");

router.route("/signup").post(authController.signUp);

router.route("/signin").post(authController.signIn);

// router.route("/").get(userController.getAllUsers);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .delete(userController.deleteUser)
//   .patch(userController.updateUser);

module.exports = router;
