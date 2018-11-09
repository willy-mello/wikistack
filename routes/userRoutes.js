const express= require('express');
const router= express.Router();
const userList= require('../views/userList');
const models = require('../models/index');
const User=models.User;

router.get('/',async (req,res,next)=>{
  try{
    const allUsers= await User.findAll();
    res.send(userList(allUsers))
  }
  catch(err){
    next(err)
  }
});

module.exports=router