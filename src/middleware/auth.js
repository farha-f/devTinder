// export const auth=(req,res,next)=>{
//     console.log("Admin Middleware executed");
//     const token="admin123";
//     const isAuthorized = token ==="admin123";
//     if(!isAuthorized){
//         res.status(403).send("Access Denied");
//     }
//     else{
//         next(); }
// };
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userAuth = async (req, res, next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            throw new Error('Authentication token not found');
        }
        const decodedMessage = jwt.verify(token, 'DEV@7900TINDER');
        const { _id } = decodedMessage;
        const user = await User.findById(_id);
        if(!user){
            throw new Error('User not found');
        }
        req.user = user;
        next();
    } catch(err){
        return res.status(401).send('Unauthorized: '+ err.message);
    }
}
module.exports = userAuth;