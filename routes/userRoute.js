import express from 'express';
import { body } from 'express-validator';
import {  createAccount, authentificateUser, displayUserProfile,modifyUserProfile, recoverPassword,validateOTP, changePassword, displayAllUsers, deleteUser, addNearbyFriend, displayNearbyFriends, deleteAccount } from '../controllers/userController.js';

const router = express.Router();
router
.route('/displayAllUsers')
.get(displayAllUsers)
router
.route('/displayNearbyFriends')
.get(displayNearbyFriends)
router
.route('/register')
.post(createAccount) 
router
.route('/login')
.post(authentificateUser)
router
.route('/:_id')
.delete(deleteUser)
.get(displayUserProfile)
.patch(modifyUserProfile)

router 
.route('/recoverPass')
.post(recoverPassword)
router
.route('/validateOtp')
.post(validateOTP)
router 
.route('/changePass')
.post(changePassword)
router
.route('/addNearbyFriend')
.post(addNearbyFriend)
router
.route('deleteAccount')
.delete(deleteAccount)




  



export default router;
