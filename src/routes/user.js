const express = require('express');
const userAuth   = require('../middleware/auth');
const userRouter = express.Router();
const connectionRequest = require('../models/connectRequest');
const { Connection } = require('mongoose');
const User = require('../models/user');

// get the all pending connection requests for the logged in user
const USER_SAVE_DATA= ['firstName', 'lastName', 'photo', 'about', 'skill'];
userRouter.get('/user/requests/received',userAuth , async(req, res)=>{
    try{
        const loggededInUser= req.user;
        const connectRequests= await connectionRequest.find({
            toUserId:loggededInUser._id,
            status:'interested'
         
        }).populate('fromUserId', USER_SAVE_DATA);
        res.json({message: "Connection requests fetched successfully", data:connectRequests})
    }
    catch(err){
        res.status(500).send("Error fetching connection requests: " + err.message);
    }
});
userRouter.get('/user/connections', userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;
        
        const connectionRequests = await connectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id, status:'accepted'},
                {fromUserId: loggedInUser._id, status:'accepted'}
            ],
        }).populate('fromUserId', USER_SAVE_DATA)
        .populate('toUserId', USER_SAVE_DATA);
        const data = connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
        else{
            return row.fromUserId;
        }
    }
        );
        res.json({data} );
    }
    catch(err){
        res.status(400).send({message: "Error fetching connections: " + err.message});
    }
});
userRouter.get('/feed', userAuth, async(req, res)=>{
    try{
        // logged in user should see all the user except 
        // 0. his own card
        // 1. his connection 
        // 2. ignored users
        // 3. already sent requests
        
        // find all the connection requests ( sent + received)
        const page = parseInt(req.query.page)||1;
        let limit = parseInt(req.query.limit)||10;
        limit = limit > 50 ? 50 : limit;

        const skip= (page-1) * limit;
        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest.find({
            $or:[{fromUserId: req.user._id}, {toUserId : req.user._id}]
        }).select('fromUserId toUserId ');
        const hideUserfromFeed = new Set();
        connectionRequests.forEach((request)=>{
            hideUserfromFeed.add(request.fromUserId.toString());
            hideUserfromFeed.add(request.toUserId.toString());
        });
        const user = await  User.find({
            $and:[
                {_id: {$nin: Array.from(hideUserfromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]
            

        }).select(USER_SAVE_DATA).skip(skip).limit(limit);;
        res.send(user);
    } catch(err){
        res.status(500).send("Error fetching users"+ err.message);
    }
});

module.exports= userRouter;


// "email":"vanila2@gmail.com",
//         "password":"Vanila2@123"