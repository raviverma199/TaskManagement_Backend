/**
 * @swagger
 * /api/task/CreateTask:
 *   post:
 *     summary: "Create a new task"
 *     tags:
 *       - Task
 *     description: "Creates a new task by providing the necessary details like title, description, due date, priority, status, and assigned user."
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: >
 *           Pass the access token in the Authorization header.  
 *           In Postman, go to **Authorization**, select **Bearer Token**, and paste the token.
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <your_access_token>"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - priority
 *               - status
 *               - assignedTo
 *             properties:
 *               title:
 *                 type: string
 *                 description: "The title of the task"
 *                 example: "Title"
 *               description:
 *                 type: string
 *                 description: "A detailed description of the task"
 *                 example: "Description"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: "The due date for the task"
 *                 example: "2024-12-20"
 *               priority:
 *                 type: string
 *                 description: "The priority of the task"
 *                 example: "High"
 *               status:
 *                 type: string
 *                 description: "The status of the task"
 *                 example: "Pending"
 *               assignedTo:
 *                 type: string
 *                 description: "The user to whom the task is assigned"
 *                 example: "ObjectId"
 *     responses:
 *       201:
 *         description: "Task created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Confirmation message"
 *                   example: "Task created successfully"
 *       400:
 *         description: "Bad request - Missing required fields"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "Error message"
 *                   example: "All fields are required"
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "Error message"
 *                   example: "Internal Server Error"
 */











/**
 * @swagger
 * /api/task/UpdateTask:
 *   put:
 *     summary: "Update an existing task"
 *     tags:
 *       - Task
 *     description: "Updates the details of an existing task. The task is updated based on the provided `taskId` and other optional fields."
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: "Pass the access token in the Authorization header. In Postman, select **Bearer Token** and paste the token."
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <your_access_token>"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *             properties:
 *               taskId:
 *                 type: string
 *                 description: "The unique ID of the task to update"
 *                 example: "60b8d6c3f1f2f3c3d3b8d6c3"
 *               title:
 *                 type: string
 *                 description: "The title of the task"
 *                 example: "Update Documentation"
 *               description:
 *                 type: string
 *                 description: "A detailed description of the task"
 *                 example: "Update the API documentation for the new endpoint"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: "The due date for the task"
 *                 example: "2024-12-30"
 *               priority:
 *                 type: string
 *                 description: "The priority level of the task"
 *                 example: "High"
 *               status:
 *                 type: string
 *                 description: "The current status of the task"
 *                 example: "In Progress"
 *               assignedTo:
 *                 type: string
 *                 description: "The user to whom the task is assigned"
 *                 example: "userId_12345"
 *     responses:
 *       200:
 *         description: "Task updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
 *       400:
 *         description: "Bad request - Invalid Object Id or missing fields"
 *       404:
 *         description: "Task not found or no changes detected"
 *       500:
 *         description: "Internal server error"
 */













/**
 * @swagger
 * /api/task/DeleteTask:
 *   delete:
 *     summary: "Delete a task"
 *     tags:
 *       - Task
 *     description: "Deletes the task identified by the provided `taskId`."
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: "Pass the access token in the Authorization header. In Postman, select **Bearer Token** and paste the token."
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <your_access_token>"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *             properties:
 *               taskId:
 *                 type: string
 *                 description: "The unique ID of the task to delete"
 *                 example: "60b8d6c3f1f2f3c3d3b8d6c3"
 *     responses:
 *       200:
 *         description: "Task deleted successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Task Deleted Successfully"
 *       400:
 *         description: "Bad request - Invalid Object Id"
 *       404:
 *         description: "Task not found"
 *       500:
 *         description: "Internal server error"
 */









/**
 * @swagger
 * /api/task/ViewTask:
 *   get:
 *     summary: "View assigned tasks"
 *     tags:
 *       - Task
 *     description: "This API retrieves the tasks assigned to the user or created by the user depending on the role."
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: "Pass the access token in the Authorization header. In Postman, select **Bearer Token** and paste the token."
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <your_access_token>"
 *     responses:
 *       200:
 *         description: "Tasks retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: "The ID of the task"
 *                         example: "60b8d6c3f1f2f3c3d3b8d6c3"
 *                       title:
 *                         type: string
 *                         description: "The title of the task"
 *                         example: "Fix Login Bug"
 *                       description:
 *                         type: string
 *                         description: "The description of the task"
 *                         example: "Fix the issue where users cannot log in"
 *                       dueDate:
 *                         type: string
 *                         format: date
 *                         description: "The due date of the task"
 *                         example: "2024-12-30"
 *                       priority:
 *                         type: string
 *                         description: "The priority level of the task"
 *                         example: "High"
 *                       status:
 *                         type: string
 *                         description: "The status of the task"
 *                         example: "In Progress"
 *                       createdBy:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: "The name of the user who created the task"
 *                             example: "xyz"
 *                           email:
 *                             type: string
 *                             description: "The email of the user who created the task"
 *                             example: "xyz.dev@outlook.com"
 *                       assignedTo:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: "The name of the user assigned to the task"
 *                             example: "xyz"
 *                           email:
 *                             type: string
 *                             description: "The email of the user assigned to the task"
 *                             example: "xyz.dev@outlook.com"
 *       404:
 *         description: "User information (role or id) is missing"
 *       500:
 *         description: "Internal server error"
 */








/**
 * @swagger
 * /api/stats/ViewTaskStats:
 *   get:
 *     summary: Get full task statistics
 *     description: Get the task statistics such as completed tasks, pending tasks, and overdue tasks for all users.
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved task statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     completedTask:
 *                       type: integer
 *                       example: 50
 *                     pendingTask:
 *                       type: integer
 *                       example: 20
 *                     OverDue:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /api/stats/ViewStatsManager:
 *   get:
 *     summary: Get manager-specific task analytics
 *     description: Get task statistics for a specific manager, including total tasks, completed tasks, pending tasks, overdue tasks, and high priority tasks.
 *     tags: [Analytics]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token for authentication
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your-jwt-token"
 *     responses:
 *       200:
 *         description: Successfully retrieved manager task analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalTasks:
 *                       type: integer
 *                       example: 100
 *                     completedTasks:
 *                       type: integer
 *                       example: 60
 *                     pendingTasks:
 *                       type: integer
 *                       example: 30
 *                     overdueTasks:
 *                       type: integer
 *                       example: 10
 *                     highPriority:
 *                       type: integer
 *                       example: 25
 *       403:
 *         description: Forbidden, only managers can access this data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "You need to be a manager to access this data."
 *       400:
 *         description: Bad Request, manager ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Manager ID is required."
 *       404:
 *         description: Not Found, no tasks found for the manager
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No tasks found for this manager."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, please try again."
 */




