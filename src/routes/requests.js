const express = require('express');
const requestsRouter = express.Router();
const userAuth = require('../middleware/auth');
const ConnectionRequest = require('../models/connectRequest');
const User = require('../models/user');


requestsRouter.post('/request/send/:status/:toUserId',userAuth, async(req, res)=>{
    // const user = req.user;
    // console.log("Connect request received");
    // res.send(user.firstName + " request sent successfully");
    try{
const fromUserId= req.user._id;
const toUserId= req.params.toUserId;
const status= req.params.status;
const allowedStatus= ['ignored','interested'];
if(!allowedStatus.includes(status)){
    res.status(400).json({message: 'Invalid status value' + status});
}
const toUser = await User.findById(toUserId);
if(!toUser){
    return res.status(404).json({message:'User not Found with Id: ' });
}
const existingConnectionReqeuest=  await ConnectionRequest.findOne({
    $or:[
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
    ]
});
if(existingConnectionReqeuest){
    return res.status(400).json({
        message:`Connection request already exists bewteen`,
        data: existingConnectionReqeuest
    })
}
const userExists = await User.findById(toUserId);
if(!userExists){
    return res.status(404).json({message:'User not Found with Id: '});
}

const connectionRequest = new ConnectionRequest ({
    fromUserId,
    toUserId,
    status
});
const data= await connectionRequest.save();
res.json({
    message: req.user.firstName + " is " + status + " to " + toUser.firstName,
    data
})
    }
    catch(err){
       res.status(400).send("Error sending request:"+ err.message);
    }

});
requestsRouter.post('/request/review/:status/:requestId', userAuth, async(req,res)=>{
    try{
        const loggedInUser= req.user;
        const isAllowedStatus=['accepted', 'rejected'];
        const {status, requestId}= req.params;
        if(!isAllowedStatus.includes(status)){
            return res.status(400).json({message:'status not allowed'});
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:'interested',
             });
    if(!connectionRequest){
        return res.status(404).json({message:'Connection request not found'});
    }
    connectionRequest.status=status;
    const data = await connectionRequest.save();
    res.json({message:`Connection request ${status} successfully`, data});
    }
    catch(err){
        res.status(400).send("Error "+err.message);
    }
})
module.exports = requestsRouter;