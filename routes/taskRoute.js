const express = require("express");
const router = express.Router();
const taskController = require("./../controllers/taskController");
const authController = require("./../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API endpoints for managing tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get ONLY SHARED tasks for all users
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter tasks by category
 *     responses:
 *       200:
 *         description: A list of SHARED tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             example:
 *              - _id: "6692f0052467b9cd21232101"
 *                title: "Build a personal website"
 *                category: "Personal"
 *                type: "text"
 *                is_shared: true
 *                user: "6692f0052467b9cd21232101"
 *                name: "amr"
 *                email: "amr@gmail.com"
 *                textTask:
 *                   body: "Design and develop a personal portfolio website to showcase projects and skills."
 *              - _id: "6692fe822467b9cd21232117"
 *                title: "Create a blog post"
 *                category: "Work"
 *                type: "list"
 *                is_shared: true
 *                user: "6692f0052467b9cd21232101"
 *                name: "amr"
 *                email: "amr@gmail.com"
 *                items:
 *                  - item_body: "Choose a topic"
 *                  - item_body: "Write the content"
 *                  - item_body: "Publish the post"
 *       401:
 *         description: Unauthorized
 */

router.route("/").get(taskController.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task
 *     responses:
 *       200:
 *         description: The task description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *              - _id: "6692f0052467b9cd21232101"
 *                title: "Build a personal website"
 *                category: "Personal"
 *                type: "text"
 *                is_shared: true
 *                user: "6692f0052467b9cd21232101"
 *                name: "amr"
 *                email: "amr@gmail.com"
 *                textTask:
 *                   body: "Design and develop a personal portfolio website to showcase projects and skills."
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *         description: The ID of the category to which the task belongs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             - title: "Build a personal website"
 *               type: "text"
 *               is_shared: true
 *               textTask:
 *                   body: "Design and develop a personal portfolio website to showcase projects and skills."
 *     responses:
 *       201:
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *             - title: "Build a personal website"
 *               category: "Work"
 *               type: "text"
 *               is_shared: true
 *               user: "6692f0052467b9cd21232101"
 *               textTask:
 *                   body: "Design and develop a personal portfolio website to showcase projects and skills."
 *       404:
 *         description: there is no category with that id
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 *   patch:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             - is_share = false
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *             - title: "Build a personal website"
 *               category: "Work"
 *               type: "text"
 *               is_shared: false
 *               user: "6692f0052467b9cd21232101"
 *               textTask:
 *                   body: "Design and develop a personal portfolio website to showcase projects and skills."
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

router
  .route("/:id")
  .get(taskController.getTask)
  .post(authController.protect, taskController.createTask) // Create a new task
  .patch(taskController.updateTask) // Update a task by ID
  .delete(taskController.deleteTask); // Delete a task by ID

module.exports = router;
