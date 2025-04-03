import axios from 'axios'
export const getMentalPrediction = async (req,res)=>{

  try{
    const mentalData= req.body;
    // console.log('Mental Data',mentalData)
    // Send to Python API
    const response = await axios.post('http://127.0.0.1:5000/predict',  {mentalData}); 
    // console.log("response  --- >> ",response.data)
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