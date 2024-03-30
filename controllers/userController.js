import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import user from '../models/User.js';
import logger from "../utils/logger.js"
import expiresInToMilliseconds from "../utils/millisecond.js";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config(".env");

export const userSignup = async(req,res,next)=>{
    try{
          var {username,email,password} = req.body;
          const curruser= await user.findOne({email:email});
          const usr = await user.findOne({username:username});
        if(curruser || usr){
            res.status(400).json({'message':"This user already exists"});
            logger.error("This user already exists")
        }
        else{
            var salt=genSaltSync(10);
            password = hashSync(password, salt);
            const new_user = new user({
                username :  username,
                email  :  email ,
                password:password,
            })
            await new_user.save();
        res.status(201).json({"message":new_user.toObject()})
        logger.info(new_user.toObject(),"Successful signup by")
      }
      }
      catch(error){
        res.status(501).json({'message':error});
        logger.error(error,"Failed with error")
      }
  
}

export const userLogin = async(req,res,next)=>{
    try{
        var {email,password} = req.body;
        const curruser= await user.findOne({email:email});
        console.log(curruser)
      if(curruser){
        const passwordMatch = compareSync(password, curruser.password);
        if(!passwordMatch){
          logger.warn("User is Unauthorized")
            res.status(401).json({"message":"Unauthorized"});
        }
        else{
            const expiresIn=process.env.jwtExpiresIn;
           
            const token = jwt.sign(
                { userId: curruser._id},
                process.env.jwtSecret,
                { expiresIn: expiresIn}
              );
              
            const jwtExpiresAt = new Date(Date.now() + expiresInToMilliseconds(expiresIn));
            curruser.jwtToken = token;
            curruser.jwtExpiresAt = jwtExpiresAt;
            await curruser.save() ;
            res.cookie("authtoken",token,{
                expires:jwtExpiresAt,
              });
              res.status(200).json({ user: curruser});           
             }
      }
      else{
        res.status(400).json({'message':"This user does not exists"}); 
}
    }
    catch(err){
      console.error(err);
      res.status(500).json({'message':err});
    }
console.log("Login");
}
