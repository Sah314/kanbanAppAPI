const jwt = require('jsonwebtoken');
const user = require('../models/User');
require("dotenv").config('.env');

const authenticate = async(req,res,next) => {
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1];
if(token==null){
    return res.status(404).json({"message":"Token not found"})
}
const usertoken = await user.findOne({jwtToken:token});
// console.log(usertoken);
const validity = new Date(usertoken.jwtExpiresAt);

if (validity <= new Date()) {
  return res.status(401).json({ "message": "Token validity reached, please login again..." });
}

jwt.verify(token,process.env.jwtSecret,(err,user)=>{
    if(err) return res.status(403).json({"message":"Invalid token"});
    req.user=user;
    next();
});

}

module.exports =authenticate;