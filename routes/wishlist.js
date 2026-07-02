const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.use(auth);
router.post('/:productId', async (req,res)=>{
  const user = await User.findById(req.user.id);
  if(!user.wishlist.includes(req.params.productId)) user.wishlist.push(req.params.productId);
  await user.save();
  res.json({ok:true});
});
router.get('/', async (req,res)=>{
  const user = await User.findById(req.user.id).populate('wishlist');
  res.json(user.wishlist);
});
router.delete('/:productId', async (req,res)=>{
  await User.findByIdAndUpdate(req.user.id, {$pull:{wishlist:req.params.productId}});
  res.json({ok:true});
});
module.exports = router;
