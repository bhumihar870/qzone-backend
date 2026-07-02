const express = require('express');
const Razorpay = require('razorpay');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY || 'rzp_test_xxxx',
  key_secret: process.env.RAZORPAY_SECRET || 'test_secret'
});

router.post('/create', auth, async (req,res)=>{
  const {amount, items, pincode, address} = req.body;
  const options = {amount: amount*100, currency:'INR', receipt:'qzone_'+Date.now()};
  try{
    const order = await razorpay.orders.create(options);
    await Order.create({user:req.user.id, items, amount, paymentId:order.id, pincode, address});
    res.json({orderId:order.id, key:process.env.RAZORPAY_KEY});
  }catch(e){ res.status(500).json({error:e.message}); }
});

router.post('/verify', auth, (req,res)=>{
  // verify signature in production
  res.json({ok:true, message:'Payment verified - UPI/Razorpay'});
});

module.exports = router;
