const bcrypt = require('bcrypt');
const user = require('../models/User');
const expiresInToMilliseconds = require("../utils/millisecond")
const jwt = require('jsonwebtoken');
require("dotenv").config('.env');
const userSignup = async(req,res,next)=>{
    try{
          console.log("Request received");
          var {username,email,password} = req.body;
          const curruser= await user.findOne({email:email});
        if(curruser){
            res.status(400).json({'message':"This user already exists"});
        }
        else{
            var salt=bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);
            const new_user = new user({
                username :  username,
                email  :  email ,
                password:password,
            })
            await new_user.save();
        res.status(201).json({"message":new_user})
      }
      }
      catch(error){
        res.status(501).json({'message':error});
      }
    console.log("Signup")
}

const userLogin = async(req,res,next)=>{
    try{
        var {email,password} = req.body;
        const curruser= await user.findOne({email:email});
        console.log(curruser)
      if(curruser){
        const passwordMatch = bcrypt.compareSync(password, curruser.password);
        if(!passwordMatch){
            res.status(401).json({"message":"Unauthorized"});
        }
        else{
            const expiresIn=process.env.jwtExpiresIn;
           
            const token = jwt.sign(
                { userId: curruser._id},
                process.env.jwtSecret,
                { expiresIn: expiresIn}
              );
              const decoded = jwt.decode(token);
              console.log("username:",decoded);
              const jwtExpiresAt = new Date(Date.now() + expiresInToMilliseconds(expiresIn));
              curruser.jwtToken = token;
              curruser.jwtExpiresAt = jwtExpiresAt;
              await curruser.save()
              res.status(200).json({ token: token, user: curruser });            }
      }
      else{
        res.status(400).json({'message':"This user does not exists"}); 
}
    }
    catch(error){
      res.status(501).json({'message':error});
    }
console.log("Login");
}
module.exports=({userLogin,userSignup});