const express = require("express");
const router = express.Router();
const taskController = require("./../controllers/taskController");
const authController = require("./../controllers/authControllers");

router.route("/").get(taskController.getAllTasks);

router
  .route("/:id")
  .post(authController.protect, taskController.createtask) // category id

  // task id
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
