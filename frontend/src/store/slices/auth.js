import { createSlice } from "@reduxjs/toolkit";

const authData = window.localStorage.getItem('loggedInUser')!=='undefined'?JSON.parse(window.localStorage.getItem('loggedInUser')):null;
const initalState = authData?authData:{};

const authSlice  = createSlice({
  name:'auth',
  initialState:initalState,
  reducers:{
    setFormData:(state,action)=>{
     return {...action.payload}
    },
    setUserData:(state,action)=>{
      return {...action.payload}
    },
    signout:(state)=>{
      if(window.localStorage.getItem('loggedInUser')){
        window.localStorage.removeItem('loggedInUser');
      }
      return {};
    }
  }
})

export default authSlice;

export const authSliceAction = authSlice.actions;