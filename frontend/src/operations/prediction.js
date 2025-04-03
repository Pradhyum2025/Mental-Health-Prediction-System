import { axiosInstance } from "../helper/axiosIntance";

export const getMentalPrediction = async(mentalData,setResult,setFetching)=>{
  try{
    setFetching(()=>true)
    const res = await axiosInstance.post('http://localhost:8080/prediction',mentalData)
    setFetching(()=>false)
    if(res.data?.success){
      // console.log("Mental Health Prediction Response -- >> ",res.data.result)
      setResult(res.data?.result);
      document.getElementById('my_modal_1').showModal();
    }
  }catch(error){
    setFetching(()=>false)
    console.log("Mental Health Prediction Error : ",error?.response?.data?.message)
  }
}