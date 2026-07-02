const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name:String, category:String, price:Number, originalPrice:Number,
  rating:{type:Number, default:4.2}, image:String, images:[String],
  description:String, inStock:Boolean, features:[String],
  pincodes:[Number], reviews:[{type:mongoose.Schema.Types.ObjectId, ref:'Review'}]
}, {timestamps:true});
module.exports = mongoose.model('Product', ProductSchema);
