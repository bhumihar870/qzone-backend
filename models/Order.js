const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
  items:[{product:{type:mongoose.Schema.Types.ObjectId, ref:'Product'}, qty:Number, price:Number}],
  amount:Number, paymentId:String, status:{type:String, default:'created'},
  pincode:String, address:String
}, {timestamps:true});
module.exports = mongoose.model('Order', OrderSchema);
