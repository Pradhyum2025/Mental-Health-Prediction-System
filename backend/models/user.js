import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true
  },
  lastName:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true
  },
  image:{
    type:String
  }
,
  password:{
    type:String,
    required:true,
  },
  mentalHistory:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Prediction'
    }
  ]
  
})

export const User = mongoose.model('User',userSchema);

