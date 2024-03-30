import jwt from 'jsonwebtoken';
import user from '../models/User.js';
import { config } from "dotenv";
config(".env");


const authenticate = async(req,res,next) => {
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1];
if(token==null){
    return res.status(404).json({"message":"Token not found"})
}
const usertoken = await user.findOne({jwtToken:token});
// console.log(usertoken.jwtExpiresAt);
// const validity = new Date(usertoken.jwtExpiresAt);

// if (validity <= new Date(Date.now())) {
//   return res.status(401).json({ "message": "Token validity reached, please login again..." });
// }

    jwt.verify(token,process.env.jwtSecret,(err,user)=>{
    if(err) return res.status(403).json({"message":"Invalid token"});
    req.user=user;
    next();
});

}

export default authenticate;