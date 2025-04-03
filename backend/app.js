import express from "express";
const app = express();

//Imported  routes
import authRoutes from "./routes/User.js";


//Imported ConectedDB
import connectDB from "./config/connectDB.js";

//NPM Packages
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import bodyParser from "body-parser";
import predictionRoutes from "./routes/prediction.js";

//load env file
dotenv.config(); 
const PORT = process.env.PORT || 4040 ;

//connect database
connectDB();

app.use(cors(
  {
    origin:'http://localhost:5173',
    credentials:true
  }
))
  

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//all routers
app.use('/auth',authRoutes);
app.use('/prediction',predictionRoutes);


//Def route
app.get("/",(req,res)=>{
  console.log("Listing at home rotes!");
  res.status(200).json({
    success:true,
    message:'You are at home route! Welcome'
  })

})
//Activate the server
app.listen(PORT,()=>{
  console.log(`Port started at port number ${PORT}`);
})


