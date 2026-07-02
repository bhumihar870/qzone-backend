const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name:String, email:{type:String, unique:true}, password:String,
  role:{type:String, enum:['user','admin'], default:'user'},
  wishlist:[{type:mongoose.Schema.Types.ObjectId, ref:'Product'}],
  addresses:[{pincode:String, city:String, line:String}]
}, {timestamps:true});
module.exports = mongoose.model('User', UserSchema);
