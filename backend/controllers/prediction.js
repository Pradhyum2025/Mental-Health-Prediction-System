import axios from 'axios'
import { User } from '../models/user.js';
import { Prediction } from '../models/prediction.js';

export const getMentalPrediction = async (req,res)=>{

  try{

    const mentalData= req.body;
    const userId = req.user.id;

    const gender = parseInt(mentalData?.gender)
    const age = parseInt(mentalData?.age)
    const acadmicPressure=parseInt(mentalData?.acadmicPressure)
    const cgpa = parseFloat(mentalData.cgpa)
    const studySatisfaction = parseInt(mentalData.studySatisfaction)
    const sleepDuration = parseInt(mentalData.sleepDuration)
    const dietaryHabits = parseInt(mentalData.dietaryHabits)
    const degree = parseInt(mentalData.degree)
    const suicidalThought = parseInt(mentalData.suicidalThought)
    const workHour = parseInt(mentalData.workHour)
    const financialStress = parseInt(mentalData.financialStress)
    const familyMenatlIllnes = parseInt(mentalData.familyMenatlIllnesc)

  //  if(!gender ||
  //     !age ||
  //     !acadmicPressure ||
  //     !cgpa ||
  //     !studySatisfaction ||
  //     !sleepDuration ||
  //     !dietaryHabits ||
  //     !degree ||
  //     !suicidalThought ||
  //     !workHour ||
  //     !financialStress ||
  //     !familyMenatlIllnes){

  //     return res.status(400).json({
  //         sucess:false,
  //         message:'All Fields are required'
  //       })
  //     }
  
  

    // Send to Python API
    const response = await axios.post('http://127.0.0.1:5000/predict',  {mentalData}); 

    const currentPrediction = await Prediction.create({...mentalData,predictionResult:response.data?.mentalResult});
    
    await User.findByIdAndUpdate(userId,{
      $push:{
        mentalHistory:[currentPrediction._id]
      }
    })

    res.status(200).json({
      success:true,
      result:response.data
    })
  }catch(error){
    console.log('Mental Prediction Error : ',error?.message);
    res.status(500).json({
      sucess:false,
      message:'Internal Server Error'
    })
  }
}



export const getMyMentalHealthHistory = async (req,res)=>{

  try{
    const userId = req.user.id;
    const loggedInUser = await  User.findById(userId,{mentalHistory:true}).populate('mentalHistory');

  console.log('loggedInUser',loggedInUser)
    if(!loggedInUser){
      res.status(400).json({
        sucess:false,
        message:'User Not Found!'
      })
    }

    res.status(200).json({
      success:true,
      mentalHistory:loggedInUser.mentalHistory
    })
    
  }catch(error){
    console.log('Get Mental History Error : ',error?.message);
    res.status(500).json({
      sucess:false,
      message:'Internal Server Error'
    })
  }
}



export const updatemyMentalHistory = async (req,res)=>{

  try{
    const { predictionId } = req.params;
    const userId = req.user.id;
    const mentalData = req.body;

    if(!userId || !predictionId){
      res.status(400).json({
        sucess:false,
        message:'Something was missing! Try again'
      })
    }
    
    // if(!mentalData?.gender ||
    //    !mentalData?.age ||
    //    !mentalData?.acadmicPressure ||
    //    !mentalData?.cgpa ||
    //    !mentalData?.studySatisfaction ||
    //    !mentalData?.sleepDuration ||
    //    !mentalData?.dietaryHabits ||
    //    !mentalData?.degree ||
    //    !mentalData?.suicidalThought ||
    //    !mentalData?.workHour ||
    //    !mentalData?.financialStress ||
    //    !mentalData?.familyMenatlIllnes){
    //      res.status(400).json({
    //        sucess:false,
    //        message:'All Fields are required'
    //      })
    //    }


     // Send to Python API
     const response = await axios.post('http://127.0.0.1:5000/predict',  {mentalData}); 
    console.log(response.data)
     const resul = await Prediction.findByIdAndUpdate(predictionId,{...mentalData,predictionResult:response.data?.mentalResult},{new:true});
     
     res.status(200).json({
       success:true,
       result:response.data
     })
    
  }catch(error){
    console.log('Mental Prediction Error : ',error?.message);
    res.status(500).json({
      sucess:false,
      message:'Internal Server Error'
    })
  }
}