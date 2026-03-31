const mongoose = require('mongoose');
const connectRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:['ignored','accepted','rejected','interested'],
            message:`{VALUE} is incorrect status type`
        }
    },
    
}
,{timestamps:true});
connectRequestSchema.index({fromUserId:1, toUserId:1});
connectRequestSchema.pre('save', function(){
    const connectRequest = this;
    // check if fromUserId is same as to UserId
    if(connectRequest.fromUserId.equals(connectRequest.toUserId)){
        throw new Error('cannot send connection request to yourself');
    }
    // next();
});
const ConnectionRequestModel = mongoose.model('connectionRequest', connectRequestSchema);
module.exports= ConnectionRequestModel;