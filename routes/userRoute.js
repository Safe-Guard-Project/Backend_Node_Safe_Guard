import express from 'express';
import { body } from 'express-validator';
import {displayUserProfile,modifyUserProfile, recoverPassword,validateOTP, changePassword, displayAllUsers, deleteUser, addNearbyFriend, displayNearbyFriends, deleteAccount, recoverPasswordByPhoneNumber,verifyOTPFromTwilio, createAccountAdmin, createAccountClient, authenticateClient, authenticateAdmin } from '../controllers/userController.js';

const router = express.Router();
router
.route('/displayAllUsers')
.get(displayAllUsers)
router
.route('/displayNearbyFriends')
.get(displayNearbyFriends)
router
.route('/registerClient')
.post(createAccountClient) 
router
.route('/registerAdmin')
.post(createAccountAdmin)

router
.route('/loginClient')
.post(authenticateClient)
router
.route('/loginAdmin')
.post(authenticateAdmin)

router
.route('/profile/:_id')
.get(displayUserProfile)
.patch(modifyUserProfile)
router 
.route('/recoverPass')
.post(recoverPassword)
router
.route('/validateOtp')
.post(validateOTP)
router
.route('/recoverPassBySms')
.post(recoverPasswordByPhoneNumber)
router
.route('/verifyOTPFromTwilio')
.post(verifyOTPFromTwilio)
router 
.route('/changePass')
.post(changePassword)
router
.route('/addNearbyFriend')
.post(addNearbyFriend)
router
.route('/deleteAccount')
.delete(deleteAccount)

  



export default router;
