const express = require('express');
const requestsRouter = express.Router();
const userAuth = require('../middleware/auth');

requestsRouter.post('/sendConnectRequest',userAuth, async(req, res)=>{
    const user = req.user;
    console.log("Connect request received");
    res.send(user.firstName + " request sent successfully");
})
module.exports = requestsRouter;