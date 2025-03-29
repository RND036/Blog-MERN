import bcryptjs from "bcryptjs";
import {errorHandler} from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req,res) => {
    res.json({message:'Api is working'});
};

export const updateUser = async (req,res,next) => {
    //to check the userid from params is equal to user 
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to update this user'));
    }
    //to update the password
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400,'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10);
      
    }
    // to update username
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(400,'Username must be between 7 to 20 characters'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400,'Username must not contain spaces'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400,'Username must be in lowercase'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400,'Username must contain only letters and numbers'));
        }
        try {
            // to update the userdata
            const updatedUser= await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    password:req.body.password,
                    email:req.body.email,

                },
            },{new:true}//to set the updated data  new should be true
        );
        // to separate the password from the rest
        const {password,...rest} = updatedUser._doc;
        res.status(200).json(rest);

            
        } catch (error) {
            next(error);
            
        }
    }
   

}

export const deleteUser = async (req,res,next) => {
    //to check the userid from params is equal to user 
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to delete this user'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User deleted successfully');
        
    } catch (error) {
        next(error);
        
    }
}