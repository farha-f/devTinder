const express = require('express');
const app = express();
app.use('/test',(req,res)=>{
    res.send('hello from server');
});
app.use('/data',(req,res)=>{
    res.send("Here is some data from data");
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});