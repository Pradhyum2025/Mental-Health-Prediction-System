import {configureStore} from '@reduxjs/toolkit'
import fetchSlice from '../slices/fetchSlice';
import authSlice from '../slices/auth';
import historySlice from '../slices/historySlice';


const appStore = configureStore({
  reducer:{
   auth:authSlice.reducer,
   fetching:fetchSlice.reducer,
   history:historySlice.reducer,
  }
})

export default appStore;