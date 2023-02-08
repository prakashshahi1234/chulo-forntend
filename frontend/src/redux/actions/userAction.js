import axios from "axios";
import locationguide from './locationguide.gif'
import {
  GET_DETAIL_ORDER_FAILED,
  GET_DETAIL_ORDER_REQUEST,
  GET_DETAIL_ORDER_SUCCESS,
  GET_LOCATION_FAILED,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_STATUS_OF_APPLICATION_FAILED,
  GET_STATUS_OF_APPLICATION_REQUEST,
  GET_STATUS_OF_APPLICATION_SUCCESS,
  GET_USER_ADRESS,
  LOADING_FALSE,
  LOADING_TRUE,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  ORDER_PLACE_FAILED,
  ORDER_PLACE_REQUEST,
  ORDER_PLACE_SUCCESS,
REGISTER_USER_FAILED,
REGISTER_USER_REQUEST,
REGISTER_USER_SUCCESS,
UPDATE_USER_ADRESS,
UPDATE_USER_ADRESS_FAILED,
VERIFY_USER_FAILED,
VERIFY_USER_REQUEST,
VERIFY_USER_SUCCESS

} from "../constants/userConstant"
import { useAlert } from "react-alert";
import { deleteCartItem } from "./productAction";

const baseUrl = '/api/v1';
export const register=(email,password , name)=>async (dispatch)=>{
         try {

            dispatch({type:REGISTER_USER_REQUEST});
            const {data}  = await axios.post(`${baseUrl}/register`,{phone:email,password, name});
                
                dispatch({type:REGISTER_USER_SUCCESS,payload:data})
                window.location.href=`/verify/${email}`
                
         } catch (error) {
          dispatch({
            type: REGISTER_USER_FAILED,
            payload: error.response.data.message,
          });
         }

}

export const verifyUser=(email,otp)=>async (dispatch)=>{
         try {

            dispatch({type:VERIFY_USER_REQUEST});

            const {data}  = await axios.post(`${baseUrl}/verify-email`,{phone:email,otp});
                
                dispatch({type:VERIFY_USER_SUCCESS,payload:data.user})
                
                
         } catch (error) {

          dispatch({
            type: VERIFY_USER_FAILED,
            payload: error.response.data.message,
          });

         }

}

export const loginUser=(phone,password)=>async (dispatch)=>{
         try {

            dispatch({type:LOGIN_USER_REQUEST});

            const {data}  = await axios.post(`${baseUrl}/login`,{phone,password});
                
                dispatch({type:LOGIN_USER_SUCCESS,payload:data.user})

                
         } catch (error) {

          dispatch({
            type: LOGIN_USER_FAILED,
            payload: error.response.data.message,
          });

         }

}

export const logoutuser = () =>async(dispatch)=>{

  try{
   dispatch({type:LOGOUT_USER_REQUEST});

   const {data} = await axios.get(`${baseUrl}/logout`);

   dispatch({type:LOGOUT_USER_SUCCESS})
  }
  catch(e){
    dispatch({type:LOGOUT_USER_FAILED , payload:e?.response?.data?.message})

  }
}

// get adress
export const getUserAdress = () =>async(dispatch)=>{

  try{

   const {data} = await axios.get(`${baseUrl}/getAdress`);
  
   dispatch({type:GET_USER_ADRESS , payload:data.adress})

  }
  catch(e){

    dispatch({type:GET_USER_ADRESS , payload:e.response.data.message})

  }
}

// update adress
export const updateUserAdress = (province, district , localstate , wardNo, reference , streetName , area) =>async(dispatch)=>{

  try{

      await axios.post(`${baseUrl}/updateAdress` , {province, district , localstate , wardNo , reference   , streetName , areaId:area});
   
   const {data} = await axios.get(`${baseUrl}/getAdress`);

   dispatch({type:UPDATE_USER_ADRESS , payload:data.adress})


  }
  catch(e){

    dispatch({type:UPDATE_USER_ADRESS_FAILED , payload:e.response.data.message})

  }
}


   

export const getUserDetail =()=> async(dispatch) =>{
  try{
  dispatch({type:LOGIN_USER_REQUEST})
  const {data}  = await axios.get("/api/v1/me");

   dispatch({type:LOGIN_USER_SUCCESS, payload: data.user})
   

}
catch(e){
dispatch({type:LOGIN_USER_FAILED, payload:e.response.data.message})

}
}


   
// place a new order
export const placeOrder =(obj)=> async(dispatch) =>{
  try{
  dispatch({type:ORDER_PLACE_REQUEST})

  const {data}  = await axios.post("/api/v1/order/new",obj);

   dispatch({type:ORDER_PLACE_SUCCESS, payload: data.result})
  
   if(data?.success){
     window.location.href="/user-profile"
   }
    
}
catch(e){

  dispatch({type:ORDER_PLACE_FAILED, payload: e.response.data.message})

}
}


// get all not  delivered order
export const getOrder =()=> async(dispatch) =>{

  try{
  dispatch({type:GET_ORDER_REQUEST})

  const {data}  = await axios.get("/api/v1/order/myOrder");

   dispatch({type:GET_ORDER_SUCCESS, payload: data.result})
   

}
catch(e){
  
dispatch({type:GET_ORDER_FAILED, payload: e.message})

}
}

// get all not  delivered order details
export const getOrderDetails =(arr)=> async(dispatch) =>{

  try{

  dispatch({type:GET_DETAIL_ORDER_REQUEST})

  const {data}  = await axios.post("/api/v1/order/detail/user" , {arr});

   dispatch({type:GET_DETAIL_ORDER_SUCCESS, payload: data.result})
   

}
catch(e){
  
dispatch({type:GET_DETAIL_ORDER_FAILED, payload: e.message})

}
}


// for loding purpose only
export const loadingTrue =()=> async(dispatch) =>{
  try{
    dispatch({type:LOADING_TRUE})

  }catch(e){

  }
}

// for loding purpose only
export const loadingFalse =()=> async(dispatch) =>{
  try{
  dispatch({type:LOADING_FALSE})

  }catch(e){
    
  }
}

export const getStatusOfApplication =()=> async(dispatch)=>{
 try {
  dispatch({type:GET_STATUS_OF_APPLICATION_REQUEST})

  const {data}  = await axios.get("/api/v1/status-of-application");

    dispatch({type:GET_STATUS_OF_APPLICATION_SUCCESS , payload:data.result})



 } catch (error) {
  dispatch({type:GET_STATUS_OF_APPLICATION_FAILED , payload:error.message})
 }
}

export const setLocation =(alert)=> async(dispatch)=>{
 try {
  dispatch({type:GET_LOCATION_REQUEST , payload:{timeStamp:new Date().getTime()}})
 
  navigator.permissions.query({ name: 'geolocation' }).then((result) => {
     const verifyPage =window.location.pathname.search("/verify")
    if(result.state==="denied" && verifyPage !==0){
      alert.error(<div>
        <p>Follow the guide below to allow location for better  experience.</p>
        <img src={locationguide}  />
        </div>,{timeOut:15000})
      const timeStamp =new Date().getTime()
      dispatch({type:GET_LOCATION_SUCCESS , payload:{ timeStamp}})
    }else{
      if(result.state==="prompt") alert.info("Allow location to get better experience.")
        if ('geolocation' in navigator) {
             navigator.geolocation.getCurrentPosition((response)=>{
    
              const latitude = response.coords.latitude;
              const longitude =response.coords.longitude;
              const timeStamp =new Date().getTime()
              
              dispatch({type:GET_LOCATION_SUCCESS , payload:{latitude ,longitude , timeStamp}})})
          }else{

               const timeStamp =new Date().getTime()     
               dispatch({type:GET_LOCATION_SUCCESS , payload:{timeStamp}})
             }

}
})
 } catch (error) {
  dispatch({type:GET_LOCATION_FAILED , payload:error.message})
 }
}