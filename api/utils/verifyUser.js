// to verify user is authenticated or not
import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';

export const verifyToken = (req,res,next) =>{
    // get the token form cookie
    const token = req.cookies.access_token;
    // verify token
    if(!token) return next(errorHandler(401,'Unauthorized'));

    jwt.verify(token,process.env.JWTCODE ,(err,user)=>{
        
        if(err) {
            return next(
                errorHandler(401,'Unauthorized'));
            
        }
        req.user = user;
        next(); 
    });
    

}