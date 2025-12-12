const mongoose = require('mongoose');
const connectDb = async ()=>{
   // mongodb+srv://farhatm027_db_user:sT4sfMBWwmj31IXS@namastenode.9imonql.mongodb.net/?appName=devTinder
   //await mongoose.connect('mongodb+srv://farhatm027_db_user:sT4sfMBWwmj31IXS@namastenode.9imonql.mongodb.net/?appName=namasteNode');
    await mongoose.connect('mongodb+srv://farhatm027_db_user:sT4sfMBWwmj31IXS@namastenode.9imonql.mongodb.net/devTinder ');
}


module.exports = connectDb;