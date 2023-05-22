const {Modles}= require('../modles/model');
const jwt = require('jsonwebtoken');
const express= require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const secretkey = process.env.secretkey;
const signup_users = async(req,res)=>{

    try {
        const {name,email,phoneNo,password} = req.body;
  
        bcrypt.hash(password,10,(err,hash)=>{
         if(err){
             console.log(err,"error will be occured in the bcrypt");
         }else{
             const user = new Modles({
                 name:name,
                 email:email,
                 phoneNo:phoneNo,
                 password:hash
                })
                user.save()
                .then((value)=>{
                 res.status(200).send(value)
                })
                .catch((Err)=>{
                 console.log(Err);
                })
         }
        })
    }catch(error) {
        console.log(error,"error will be occured in the signup_users");
    }
  
}
const read_user_data = async(req,res)=>{
 try {
    const users = await Modles.find({});
    res.send(users)
    console.log(users);
 } catch (error) {
    console.log("error will be occure in the read_user_data");
 }
}
const login_user =async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        const data = await Modles.find({email:email})
        // console.log(data);
        // res.send(data)
        const result = await bcrypt.compare(password,data[0].password)
        // console.log(result);
        // res.send(result);
        if(result){
            const create_token={
                id : data._id,
                created_at: new Date() 
            }
            const tokens= jwt.sign(create_token,secretkey,{expiresIn:"1 day"});
            const datas = await Modles.findOneAndUpdate({email:email},{token:tokens});
            console.log(tokens);
            res.send(tokens)
        }
    } catch (error) {
        console.log(error,"error will be occured in the login_user func");
    }
}
module.exports={signup_users,read_user_data,login_user}