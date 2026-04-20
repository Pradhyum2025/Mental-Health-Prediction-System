import toast from "react-hot-toast";
import { axiosInstance } from "../helper/axiosIntance";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import {  historySliceAction } from "../store/slices/historySlice";

export const getMentalPrediction = async(dispatch,mentalData,setResult)=>{
  try{
    console.log(mentalData)
    dispatch(fetchSliceAction.serializeFetching())
    const res = await axiosInstance.post('/v1/prediction',mentalData)
    dispatch(fetchSliceAction.deserializeFetching())
    if(res.data?.success){
      // console.log("Mental Health Prediction Response -- >> ",res.data.result)
      setResult(res.data?.result);
      document.getElementById('my_modal_1').showModal();
    }
  }catch(error){
    dispatch(fetchSliceAction.deserializeFetching())
    console.log("Mental Health Prediction Error : ",error?.response?.data?.message)
  }
}

export const updateMentalPrediction = async(dispatch,predictionId,mentalData,setResult)=>{
  try{
    dispatch(fetchSliceAction.serializeFetching())
    const res = await axiosInstance.patch(`/v1/prediction/${predictionId}`,mentalData)
    dispatch(fetchSliceAction.deserializeFetching())
    if(res.data?.success){
      console.log("Update Mental Health Prediction Response -- >> ",res.data.result)
      setResult(res.data?.result);
      document.getElementById('my_modal_1').showModal();
    }
  }catch(error){
    dispatch(fetchSliceAction.deserializeFetching())
    console.log("Update Mental Health Prediction Error : ",error?.response?.data?.message)
  }
}


export const getMyMentalHealthHistory = async(dispatch)=>{
  try{
    const res = await axiosInstance.get(`/v1/prediction/`)
    console.log("Get Mental Health History Response -- >> ",res)
    if(res.data?.success){
      dispatch(historySliceAction.setHistoryData(res.data.mentalHistory))
    }
  }catch(error){
    console.log("Get Mental Health History Error : ",error?.response?.data?.message)
  }
}