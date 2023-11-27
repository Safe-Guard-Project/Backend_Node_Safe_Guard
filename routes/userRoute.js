import express from 'express';
import { body } from 'express-validator';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {
  displayUserProfile,
  modifyUserProfile,
  recoverPassword,
  validateOTP,
  changePassword,
  displayAllUsers,
  deleteUser,
  addNearbyFriend,
  displayNearbyFriends,
  deleteAccount,
  recoverPasswordByPhoneNumber,
  verifyOTPFromTwilio,
  createAccountAdmin,
  createAccountClient,
  authenticateClient,
  authenticateAdmin,
  getUserIdByEmail,
} from '../controllers/userController.js';

const router = express.Router();

// Swagger Options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing user-related actions',
    },
  },
  apis: ['./controllers/userController.js'], // Path to the controller file
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI at /api-docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Swagger specification at /swagger.json
router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * @swagger
 * /user/displayAllUsers:
 *   get:
 *     summary: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 */
router.route('/displayAllUsers').get(displayAllUsers);

/**
 * @swagger
 * /user/displayNearbyFriends:
 *   get:
 *     summary: Retrieve a list of nearby friends
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 */
router.route('/displayNearbyFriends').get(displayNearbyFriends);


// Define other routes and Swagger documentation similarly...

/**
 * @swagger
 * /user/registerClient:
 *   post:
 *     summary: Register a new client account
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               numeroTel:
 *                 type: string
 *             required:
 *               - UserName
 *               - email
 *               - password
 *               - numeroTel
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Invalid request or validation error
 *       500:
 *         description: Internal server error
 */
router.route('/registerClient').post(createAccountClient);




  /**
 * @swagger
 * /user/loginClient:
 *   post:
 *     summary: Authenticate a client and generate a token
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 apiKey:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.route('/loginClient').post(authenticateClient);


router
.route('/loginAdmin')
.post(authenticateAdmin)

/**
 * @swagger
 * /user/profile/{_id}:
 *   get:
 *     summary: Retrieve user profile by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     UserName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     Role:
 *                       type: string
 *                     latitudeDeUser:
 *                       type: number
 *                     longitudeDeUser:
 *                       type: number
 *                     numeroTel:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Modify user profile by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               numeroTel:
 *                 type: string
 *             required:
 *               - UserName
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     UserName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     Role:
 *                       type: string
 *                     latitudeDeUser:
 *                       type: number
 *                     longitudeDeUser:
 *                       type: number
 *                     numeroTel:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.route('/profile/{_id}')
.get(displayUserProfile)
.patch(modifyUserProfile);



/**
 * @swagger
 * /user/recoverPassword:
 *   post:
 *     summary: Recover password by email
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset code sent successfully
 *       400:
 *         description: Invalid email
 */
router
.route('/recoverPassword')
.post(recoverPassword)


/**
 * @swagger
 * /user/validateOtp:
 *   post:
 *     summary: Validate OTP code
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP is valid
 *         content:
 *           application/json:
 *             example:
 *               message: OTP is valid.
 *       400:
 *         description: Invalid OTP or reset code not found. Please request a new code.
 *       500:
 *         description: Internal server error
 */
router.route('/validateOtp').post(validateOTP);



/**
 * @swagger
 * /user/recoverPassBySms:
 *   post:
 *     summary: Recover password by phone number or email
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string

 *     responses:
 *       200:
 *         description: OTP code sent successfully
 *       400:
 *         description: Invalid phone number or email
 *       500:
 *         description: Error sending OTP code
 */
router
.route('/recoverPassBySms')
.post(recoverPasswordByPhoneNumber);


/**
 * @swagger
 * /user/verifyOTPFromTwilio:
 *   post:
 *     summary: Verify OTP code sent via Twilio
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otpCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP is verified
 *         content:
 *           application/json:
 *             example:
 *               status: verified
 *       400:
 *         description: OTP not verified
 *       500:
 *         description: Internal server error
 */
router.route('/verifyOTPFromTwilio').post(verifyOTPFromTwilio);




/**
 * @swagger
 * /user/changePass:
 *   post:
 *     summary: Change user password
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Email, password, or confirmPassword not provided; New password and confirmPassword do not match
 *       500:
 *         description: Error updating the password
 */
router.route('/changePass').post(changePassword);

/**
 * @swagger
 * /user/addNearbyFriend:
 *   post:
 *     summary: Add nearby friend
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friendId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend added successfully
 *       400:
 *         description: Invalid friendId
 *       500:
 *         description: Error adding nearby friend
 */
router.route('/addNearbyFriend').post(addNearbyFriend);

/**
 * @swagger
 * /user/deleteAccount/{userId}:
 *   delete:
 *     summary: Delete user account by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted successfully.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Error deleting Account
 */
router.route('/deleteAccount/:userId').delete(deleteAccount);





/**
 * @swagger
 * /user/deleteUser/{userId}:
 *   delete:
 *     summary: Delete user account by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted successfully.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Error deleting Account
 */
router.route('/deleteUser/:userId').delete(deleteUser);


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /getId/{email}:
 *   get:
 *     summary: Retrieve user ID by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               userId: '12345'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

router.route('/getId/:email').get(getUserIdByEmail);
export default router;
