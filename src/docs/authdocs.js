/**
 * @swagger
 * /api/auth/CreateUser:
 *   post:
 *     summary: Create a User Profile
 *     tags:
 *       - Auth
 *     description: This endpoint allows for the creation of a new user profile by providing the necessary details such as username, email, role, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The full name of the user.
 *                 example: "Ravi Verma"
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: "raviverma.dev@outlook.com"
 *               role:
 *                 type: string
 *                 description: The role assigned to the user (e.g., admin, manager, user).
 *                 example: "manager"
 *               password:
 *                 type: string
 *                 description: A secure password for the user account.
 *                 example: "SecurePass123"
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     username:
 *                       type: string
 *                       example: "Ravi Verma"
 *                     email:
 *                       type: string
 *                       example: "raviverma.dev@outlook.com"
 *                     role:
 *                       type: string
 *                       example: "manager"
 *       400:
 *         description: Validation error. The input data is invalid or the user already exists.
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
 *                   example: "User already exists"
 *       500:
 *         description: Internal server error. Something went wrong on the server.
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
 *                   example: "Internal server error"
 */






/**
 * @swagger
 * /api/auth/LoginUser:
 *   post:
 *     summary: "User login"
 *     tags:
 *       - Auth
 *     description: "Login a user by validating email and password, and returning access and refresh tokens."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "The email address of the user."
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: "The password for the user account."
 *                 example: "Password123!"
 *     responses:
 *       200:
 *         description: "Successful login"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 AccessToken:
 *                   type: string
 *                   description: "The access token for the session."
 *                   example: "access_token_here"
 *                 RefreshToken:
 *                   type: string
 *                   description: "The refresh token for the session."
 *                   example: "refresh_token_here"
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: "The username of the logged-in user."
 *                       example: "Ravi verma"
 *                     email:
 *                       type: string
 *                       description: "The email address of the logged-in user."
 *                       example: "raviverma.dev@outlook.com"
 *                     role:
 *                       type: string
 *                       description: "The role of the logged-in user."
 *                       example: "manager"
 *       400:
 *         description: "Invalid input or user not found"
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
 *                   example: "Invalid Email or Incorrect password"
 *       500:
 *         description: "Internal server error"
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
 *                   example: "Internal Server Error"
 */








/**
 * @swagger
 * /api/auth/Logout:
 *   post:
 *     summary: "User logout"
 *     tags:
 *       - Auth
 *     description: >
 *       Logs out the user by clearing the refresh token stored in cookies.  
 *       
 *       **Access Token and Refresh Token Logic**:  
 *       - **Access Token**: A short-lived token used for authenticating API requests. It is sent with every request in the `Authorization`.  
 *       - **Refresh Token**: A long-lived token used to obtain a new access token when the current one expires. This token should be stored securely, such as in an HTTP-only cookie.  
 *       During logout, the refresh token should be invalidated to ensure the session is completely terminated.  
 *       Make sure to always store refresh tokens securely and do not expose them to client-side scripts.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: >
 *           The refresh token is passed in the `Authorization` header in the format `Bearer <refresh_token>`.  
 *           
 *           **Where and How to Use the Refresh Token**:  
 *           1. Open the **Authorization** tab in Postman.  
 *           2. Select **Bearer Token** from the dropdown.  
 *           3. Paste your refresh token in the token field.  
 *           4. The `Authorization` header will be automatically included in the request.
 *         schema:
 *           type: string
 *           example: "Bearer refresh_token_here"
 *     responses:
 *       200:
 *         description: "Logout successful"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       400:
 *         description: "No refresh token provided"
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
 *                   example: "No refresh token provided"
 *       500:
 *         description: "Internal server error"
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
 *                   example: "Internal Server Error"
 */



/**
 * @swagger
 * /api/auth/RefreshToken:
 *   post:
 *     summary: "Generate a new access token"
 *     tags:
 *       - Auth
 *     description: >
 *       Creates a new access token when the previous one expires using a valid refresh token.  
 *       This approach improves security by keeping access tokens short-lived while allowing users to stay logged in without re-authenticating.  
 *       Refresh tokens should be securely stored (in HTTP-only cookies) to prevent unauthorized access.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: >
 *           Pass the access token in the Authorization header.  
 *           In Postman, select **Bearer Token** and paste the token.
 *         schema:
 *           type: string
 *           example: "Bearer refresh_token_here"
 *     responses:
 *       200:
 *         description: "New access token generated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 newAccessToken:
 *                   type: string
 *                   example: "new_access_token_here"
 *       400:
 *         description: "No refresh token provided"
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
 *                   example: "No refresh token provided"
 *       401:
 *         description: "Invalid or expired refresh token"
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
 *                   example: "Invalid or expired refresh token"
 *       500:
 *         description: "Internal server error"
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
 *                   example: "Internal Server Error"
 */













/**
 * @swagger
 * /GetUserProfile:
 *   get:
 *     summary: Retrieve the user profile
 *     tags:
 *       - ProfileData
 *     description: >
 *       Retrieves the user's profile details.  
 *       Pass the access token in the Authorization header by selecting "Bearer Token" in Postman and pasting the token.
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: >
 *           Pass the access token in the Authorization header.  
 *           In Postman, select **Bearer Token** and paste the token.
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <your_access_token>"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "User profile retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: "The name of the user"
 *                   example: "manish"
 *                 email:
 *                   type: string
 *                   description: "The email address of the user"
 *                   example: "rv200414z@outlook.com"
 *                 role:
 *                   type: string
 *                   description: "The role of the user"
 *                   example: "manager"
 *       401:
 *         description: "Unauthorized access"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "Error message"
 *                   example: "Invalid or missing token"
 *       500:
 *         description: "Internal server error"
 */

