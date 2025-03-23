import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'; //for authentication 





export const signup = async (req,res,next) =>{//next use to show the middleware
// save data to database
const{username,email,password} = req.body;

if (!username || !password ||!email || username === '' || password==='' || email===''){
    next(errorHandler(400,'All fields are required'))
}
// to hash password
const hashedPassword = bcryptjs.hashSync(password,10)

// connect to the model with credentials 
const newUser = new User({
    username,
    email,
    password:hashedPassword
});
try{
    // save user in database
await newUser.save();
res.json('signup sucessfull'); // to show a request

}
catch(error){
    next(error);
}
};


export const signin = async(req,res,next)=>{
    const{email,password} = req.body;

if (!email ||!password || email==='' || password===''){
   return next(errorHandler(400,'All fields are required'))
}
try {
    // to find the user
    const validUser = await User.findOne({email});
    if(!validUser){
       return  next(errorHandler(404,'User not found'));
    }
    //to find the password is correct
    //bcrpt js changing password and hashed it and com[are it
    const vaildPassword = bcryptjs.compareSync(password,validUser.password);
    if(!vaildPassword){
       return next(errorHandler(400,'Invalid Password'));
    }
    //to autenticate user 
    //_id is the id in the databse 
    //we encrypt the cookie to hide in brower with our own hidden key its in env 
    //if we want we can add expiration day for the cookie
    const token = jwt.sign(
        {id: validUser._id},process.env.JWTCODE,
        
    )
  
    
    //to remove password when retrieving data of the user
    const {password:pass,...rest}=validUser._doc;
    //add the token to cookie
    res.status(200).cookie('access_token',token,{
        httpOnly:true,
    }).json(rest);
    //we retrive rest without password

    
} catch (error) {
    next(error)
    
}

}
// for google sign in fucntion
export const google = async(req,res,next)=>{
    const{email,name,googlePhotoUrl} = req.body;
    try {
    
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({
                id:user._id
            },process.env.JWTCODE);
            const {password:pass,...rest}=user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest);

        }
        else{
            // create a random passsword bcz we dont have password for google sign in
            //math.random is a random number generated between 0 and 1
            //to string(36) is Base-36 uses numbers (0-9) and lowercase letters (a-z),
            //slice(-8) is to get last 8 characters of the string password is visible as 0.8ab12 then get only last digits without whole number
            //adding two for more security
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                //to make the username  unique we get the name and make to lowercase and split and join and add randomnumbers after it
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(36).slice(-5),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({
                id:newUser._id
            },process.env.JWTCODE);
            const {password:pass,...rest}=newUser._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest);
            


        }
    }
catch(error){
    next(error)
}
}


