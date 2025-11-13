const express = require('express');
const app = express();
const {auth} = require('./middleware/auth');
app.use("/admin",auth);
app.get('/admin/getUsers', (req,res)=>{
    res.send("userdata from admin");
})
app.get('/admin/deleteUsers',(req,res)=>{
    res.send("delete user data from admin");
})
// app.use('/data',(req,res, next)=>{
  
//     res.send({fname:"John", lname:"Doe"});
//     console.log("Request received");
//       next();
    
// },(req, res)=>{
// res.send("Hello from callback");
// console.log("Callback executed");
// })
// app.get('/data',(req,res)=>{
//     res.send({fname:"John", lname:"Doe"});
// });
// app.get('/data/:userId/:password',(req,res)=>{
//     console.log(req.params);
//     res.send({fname:"John", lname:"Doe"});
// });
// app.post('/data',(req,res)=>{
//     res.send("Data Posted Successfully");   
// });
// app.use('/test',(req,res)=>{
//     res.send('hello from server');
// });
// app.use('/data',(req,res)=>{
//     res.send("Here is some data from data");
// })
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});