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
          const usr = await user.findOne({username:username});
        if(curruser || usr){
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



module.exports=({userLogin,userSignup});