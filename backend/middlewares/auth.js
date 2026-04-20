import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
//load env files
dotenv.config();

// check seller authenticity
export const isAuth = (req,res,next)=>{
  
  try{
    const token = req.cookies?.token
    || req?.body?.token
    || req.header('Authorisation').replace('Bearer ',"");

    if (!token || token===undefined){
      return res.status(422).json({
        success:false,
        message:'Token missing'
      })
    }

    // varify token
    let payload={};
    try{
      payload = jwt.verify(token,process.env.JWT_SECRET);
      
      // console.log('payload',payload)
    }catch(err){
      console.log("Verify JWT Token Error : ",err.message); 
      return res.status(400).json({
        success:false,
        message:'Failed to verify token'
      })
    }

    req.user = payload;

    return next();

  }catch(error){
    console.log("isAuth middleware error ",error.message)
    return res.status(401).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }

}
