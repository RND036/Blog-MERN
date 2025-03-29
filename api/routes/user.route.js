import express from 'express';
import { test,updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test',test);
// to update user data
//to see the id of the user updating
//use verify token for verify the user
router.put('/update/:userId',verifyToken,updateUser);


export default router;