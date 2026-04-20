import { axiosInstance } from "../helper/axiosIntance";
import toast from "react-hot-toast";
import { authSliceAction } from "../store/slices/auth";
import { fetchSliceAction } from "../store/slices/fetchSlice";


// Signup function handler
export const signUp = async (navigate, dispatch, signUpData) => {
  try {
    console.log(signUpData)
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.post('/v1/auth/signup', signUpData, {
    });
    dispatch(fetchSliceAction.deserializeFetching());
    console.log("SIGNUP RESPONSE ---->>:", res)
    if (res && res?.data?.success) {
      //save user info into local storage
      window.localStorage.setItem('loggedInUser', JSON.stringify(res.data.loggedInUser));
      dispatch(authSliceAction.setUserData(res.data.loggedInUser))
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '350px',
          height:'40px',
          padding:'0px 10px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })

      navigate('/');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('SignUp error :',error)
    toast.error(error?.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        height:'60px',
        padding:'0px 20px',
        fontWeight: 900
      },
      position: 'bottom-center'
    });
  }

}

// Login / Signin function handler
export const signIn = async (navigate, dispatch, formData,currPath) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.post('/v1/auth/login', formData);
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      console.log("LOGIN RESPONSE --->>>", res)
      dispatch(authSliceAction.setUserData(res.data.loggedInUser));
      window.localStorage.setItem('loggedInUser', JSON.stringify(res.data.loggedInUser));
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '350px',
          height:'40px',
          padding:'0px 10px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })
      document.getElementById('my_modal_3').close()
      navigate(`${currPath}`);
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error?.response?.data?.message, { 
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        height:'60px',
        padding:'0px 20px',
        fontWeight: 900
      },
      position: 'right-center'
     });
    console.log('Login error : ', error)
  }

}


// Sign out function 
export const signOut = (dispatch, navigate,setUserDropDown) => {
  dispatch(authSliceAction.signout())
  dispatch(fetchSliceAction.deserializeFetching());
  if(setUserDropDown){
    setUserDropDown(()=>false)
  }
  toast.success('Logout successful', {
    style: {
      background: '#001a00',
      color: '#f2f2f2',
      borderRadius: '0px',
      width: '350px',
      height:'40px',
      padding:'0px 10px',
      fontWeight: 900
    },
    position: 'bottom-center'
  })
  navigate('/')
}


