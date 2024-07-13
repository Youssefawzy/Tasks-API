const express = require("express");
const router = express.Router();
const categoryController = require("./../controllers/categoryController");
const authController = require("./../controllers/authControllers");

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(authController.protect, categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
