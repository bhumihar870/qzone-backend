const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req,res)=>{
  const {category, min, max, search, page=1, limit=40} = req.query;
  let f = {};
  if(category) f.category = category;
  if(min||max) f.price = {$gte:Number(min||0), $lte:Number(max||1000000)};
  if(search) f.name = {$regex:search, $options:'i'};
  const products = await Product.find(f).skip((page-1)*limit).limit(Number(limit));
  const total = await Product.countDocuments(f);
  res.json({products,total,page:Number(page)});
});

router.get('/:id', async (req,res)=>{
  const p = await Product.findById(req.params.id).populate('reviews');
  res.json(p);
});

router.post('/seed', async (req,res)=>{
  const data = require('./seedData');
  await Product.deleteMany({});
  await Product.insertMany(data);
  res.json({ok:true, count:data.length, categories: [...new Set(data.map(d=>d.category))].length});
});

module.exports = router;
