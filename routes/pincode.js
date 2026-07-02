const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

const serviceable = [110001,110002,400001,400002,560001,560002,700001,600001,500001,380001];

router.get('/check/:pincode/:productId?', async (req,res)=>{
  const pin = Number(req.params.pincode);
  const deliverable = serviceable.includes(pin);
  let days = deliverable ? 3 + (pin%5) : null;
  res.json({pincode:pin, deliverable, estimatedDays:days, message: deliverable ? 'Delivery available' : 'Not serviceable'});
});

module.exports = router;
