const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req,res)=>{
  const {name,email,password} = req.body;
  const hash = await bcrypt.hash(password, 10);
  try{
    const user = await User.create({name,email,password:hash});
    res.json({ok:true, id:user._id});
  }catch(e){ res.status(400).json({error:'Email exists'}); }
});

router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({error:'Invalid'});
  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.status(400).json({error:'Invalid'});
  const token = jwt.sign({id:user._id, role:user.role, name:user.name}, process.env.JWT_SECRET || 'qzone_secret', {expiresIn:'7d'});
  res.json({token, user:{id:user._id, name:user.name, email:user.email, role:user.role}});
});

module.exports = router;
