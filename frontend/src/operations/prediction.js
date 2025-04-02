import { axiosInstance } from "../helper/axiosIntance";

export const prediction = async(Navigate,userData,setFetching)=>{
  try{
    setFetching(()=>true)
    const res = await axiosInstance.post('http://localhost:8080/predict',userData)
    setFetching(()=>false)
    if(res.data?.success){
      console.log(res.data.message)
    }
  }catch(error){
    setFetching(()=>false)
    console.log("Mental Health Prediction Error : ",error?.response?.data?.message)
  }
}