const express = require('express');
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const Product = require('../models/Product');
const router = express.Router();

router.get('/:productId', async (req,res)=>{
  const reviews = await Review.find({product:req.params.productId}).populate('user','name').sort({createdAt:-1});
  res.json(reviews);
});
router.post('/:productId', auth, async (req,res)=>{
  const {rating, comment} = req.body;
  const rev = await Review.create({product:req.params.productId, user:req.user.id, rating, comment});
  await Product.findByIdAndUpdate(req.params.productId, {$push:{reviews:rev._id}});
  res.json(rev);
});
module.exports = router;
