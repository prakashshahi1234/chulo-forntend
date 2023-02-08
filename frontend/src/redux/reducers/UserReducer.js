import { REMOVE_ERROR_FOR_PRODUCT } from '../constants/productConstants';
import {
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILED,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  GET_USER_ADRESS,
  UPDATE_USER_ADRESS,
  UPDATE_USER_ADRESS_FAILED,
  REMOVE_ERROR_FOR_USER,
  ORDER_PLACE_FAILED,
  ORDER_PLACE_REQUEST,
  ORDER_PLACE_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  LOADING_FALSE,
  LOADING_TRUE,
  GET_DETAIL_ORDER_FAILED,
  GET_DETAIL_ORDER_REQUEST,
  GET_DETAIL_ORDER_SUCCESS,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILED,
  GET_STATUS_OF_APPLICATION_REQUEST,
  GET_STATUS_OF_APPLICATION_FAILED,
  GET_STATUS_OF_APPLICATION_SUCCESS
} from '../constants/userConstant'



export const userReducer =(state ={ user: {}},action)=>{
   switch (action.type) {
     case REGISTER_USER_REQUEST:
     case LOGIN_USER_REQUEST:
          return({
            loading:true,
            isAuthenticated:false,
            isRegistering:true
          })
      case REGISTER_USER_SUCCESS:
             return({
               loading:false,                             
               user:action.payload,
               isRegistering:true
             })

     
      case GET_STATUS_OF_APPLICATION_REQUEST:
             return({
              ...state,
               loading:true,                             
             })
       case GET_LOCATION_REQUEST:
             return({
              ...state,
               loading:true,  
               location:action.payload
             })
      case VERIFY_USER_FAILED :
      case REGISTER_USER_FAILED:
      case LOGIN_USER_FAILED:
        return {
          ...state,
          loading: false,
          user: null,
          isRegistering:false,
          isAuthenticated:false,
          error: action.payload,
        };
      case VERIFY_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case VERIFY_USER_SUCCESS:
        return {          
          loading: false,          
          user:action.payload,
          isAuthenticated:true,

        };
      case GET_LOCATION_SUCCESS:
        let data  = action.payload
        return {          
          ...state,
          loading: false,          
          location:data

        };
      case GET_STATUS_OF_APPLICATION_SUCCESS:

        return {          
          ...state,
          loading: false,          
          status:action.payload

        };
      case LOGIN_USER_SUCCESS:
        return {
          ...state,          
          loading: false,
          user:action.payload,
          isAuthenticated:true,
          isRegistering:false
        };
      case ORDER_PLACE_REQUEST :
      case LOGIN_USER_REQUEST:  
      case GET_ORDER_REQUEST :   
      case GET_DETAIL_ORDER_REQUEST:  
      return {
        ...state,
        loading:true
      
      }
      case LOGOUT_USER_SUCCESS:
        return{
           user: {},
           loading:false,
           isAuthenticated:false
        }
      case LOGOUT_USER_FAILED:
        return{
          ...state ,
          loading:false,
          error: action.payload,
        }

      case GET_USER_ADRESS:
        return{
          ...state ,
          adress: action.payload,
        }
      case UPDATE_USER_ADRESS:
        return{
          ...state ,
          adress: action.payload,
        }
      case UPDATE_USER_ADRESS_FAILED:
        return{
          ...state ,
          error: action.payload,
        }
     
      case ORDER_PLACE_SUCCESS:
      case GET_ORDER_SUCCESS :
        return{
          ...state, 
          orderedItem :action.payload,
          loading:false,

        }
        case GET_DETAIL_ORDER_SUCCESS:
          return{
            ...state, 
            orderItemDetails :action.payload,
            loading:false,
  
          }
        case GET_DETAIL_ORDER_FAILED:
        case GET_ORDER_FAILED:
      case ORDER_PLACE_FAILED:
        case GET_LOCATION_FAILED:
        case GET_STATUS_OF_APPLICATION_FAILED:
        return{
          ...state ,
          loading:false,
          error: action.payload,
        }      

         
    case REMOVE_ERROR_FOR_USER:
      return{
        ...state,
        error:null
      }
      case LOADING_TRUE:
        return{
          ...state,
         loading:false
        }
    case LOADING_FALSE:
      return{
        ...state,
       loading:false
      }
      
     default:
       return state;
       break;
   }


}