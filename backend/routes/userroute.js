const {login,register}=require('../controllers/usercontroller');
const express=require('express');
const userRouter=express.Router();
userRouter.post('/login',login);
userRouter.post('/register',register);
module.exports=userRouter;