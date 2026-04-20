import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name:'history',
  initialState:[],
  reducers:{
    setHistoryData:(state,action)=>{
      return [...action.payload];
    }
  }
})

export default historySlice;
export const historySliceAction = historySlice.actions;