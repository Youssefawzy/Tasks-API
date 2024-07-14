const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User Signup
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               passwordConfirm:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *          description: User signed up successfully
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             example:
 *              - token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTJmMDA1MjQ2N2I5Y2QyMTIzMjEwMSIsImlhdCI6MTcyMDk2NTE4NSwiZXhwIjoxNzI4NzQxMTg1fQ.zHFNEIXLhkwFHZ0I3T9jTbmYxaiv5B-EfGQ26JA_aBA"
 *                user:
 *                  - _id: "6692f0052467b9cd21232101"
 *                  - name: "John Doe"
 *                  - email: "johndoe@example.com"
 *       400:
 *         description: Bad request
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal Server Error
 *
 * /signin:
 *   post:
 *     summary: User Signin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: All the user SHARED AND NOT SHARED TASKS
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             example:
 *              - token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTJmMDA1MjQ2N2I5Y2QyMTIzMjEwMSIsImlhdCI6MTcyMDk2NTE4NSwiZXhwIjoxNzI4NzQxMTg1fQ.zHFNEIXLhkwFHZ0I3T9jTbmYxaiv5B-EfGQ26JA_aBA"
 *                user:
 *                  - _id: "6692f0052467b9cd21232101"
 *                  - name: "John Doe"
 *                  - email: "johndoe@example.com"
 *
 *
 *
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal Server Error
 *
 * /mytasks:
 *   get:
 *     summary: Get User's Tasks SHARED AND NOT SHARED
 *     tags: [User Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         required: false
 *         description: Field to sort by (e.g., is_shared)
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
 *         description: All the user SHARED AND NOT SHARED TASKS
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
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */

router.route("/signup").post(authController.signUp);

router.route("/signin").post(authController.signIn);

router.route("/mytasks").get(authController.protect, userController.getMyTasks);

module.exports = router;
