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

  password:{
    type:String,
    required:true,
  },
  accountType:{
    type:String,
    enum:["Admin","Student","Instructor"],
    required:true
  },
  
})

export const User = mongoose.model('User',userSchema);

