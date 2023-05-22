const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URL = process.env.TZ;

const connections= mongoose.connect(MONGO_URL)
                   .then(()=>{
                    console.log("connect successfully");
                   })
                   .catch((ERR)=>{
                    console.log(ERR,"error will occured in the database");
                 })
module.exports={ connections }