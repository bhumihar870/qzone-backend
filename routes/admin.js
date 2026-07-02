const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// admin only
router.use(auth);

router.post('/product', async (req,res)=>{
  if(req.user.role!=='admin') return res.status(403).json({error:'Admin only'});
  const {name, category, price, originalPrice, description, imageBase64} = req.body;
  let imageUrl = imageBase64;
  try{
    if(imageBase64 && imageBase64.startsWith('data:')){
      const upload = await cloudinary.uploader.upload(imageBase64, {folder:'qzone'});
      imageUrl = upload.secure_url;
    }
  }catch(e){ console.log('Cloudinary skipped', e.message); }
  const p = await Product.create({name,category,price,originalPrice,description,image:imageUrl, inStock:true});
  res.json(p);
});

router.get('/stats', async (req,res)=>{
  const count = await Product.countDocuments();
  res.json({products:count});
});

module.exports = router;
