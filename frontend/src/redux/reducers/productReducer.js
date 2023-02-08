import {
    LOAD_ALL_PRODUCT_FAILED ,
     LOAD_ALL_PRODUCT_SUCCESS , 
     LOAD_ALL_PRODUCT_REQUEST,
     LOAD_PRODUCT_DETAIL_REQUEST,
     LOAD_PRODUCT_DETAIL_FAILED,
     LOAD_PRODUCT_DETAIL_SUCCESS,
     ADD_TO_CART_REQUEST,
     ADD_TO_CART_SUCCESS,
     ADD_TO_CART_FAILED,
     LOAD_CART_ITEM_REQUEST,
     LOAD_CART_ITEM_FAILED,
     LOAD_CART_ITEM_SUCCESS,
     LOAD_CART_DETAILS_REQUEST,
     LOAD_CARD_DETAILS_SUCCESS,
     LOAD_CARD__DETAILS_FAILED,
     DELETE_CART_ITEM_REQUEST,
     DELETE_CART_ITEM_SUCCESS,
     DELETE_CART_ITEM_FAILED,
     REMOVE_ERROR_FOR_PRODUCT,
     DELETE_ALL_CART_ITEM_REQUEST,
     DELETE_ALL_CART_ITEM_FAILED,
     DELETE_ALL_CART_ITEM_SUCCESS,
     SEARCH_PRODUCT_FAILED,
     SEARCH_PRODUCT_REQUEST,
     SEARCH_PRODUCT_SUCCESS,
     LOAD_CATEGORY_REQUEST,
     LOAD_CATEGORY_SUCCESS,
     LOAD_CATEGORY_FAILED
  } from '../constants/productConstants'
  
  
  
  export const productReducer =(state ={ product:[], cartItem:[]},action)=>{
     switch (action.type) {
       case LOAD_ALL_PRODUCT_REQUEST:
        case  LOAD_CATEGORY_REQUEST:
        case LOAD_PRODUCT_DETAIL_REQUEST:
        case LOAD_CART_DETAILS_REQUEST:
        case DELETE_CART_ITEM_REQUEST :
        case DELETE_ALL_CART_ITEM_REQUEST:
        case SEARCH_PRODUCT_REQUEST :    
        case ADD_TO_CART_REQUEST:
        case LOAD_CART_ITEM_REQUEST:                     
           return({
              ...state, 
              loading:true
            })
        case LOAD_CATEGORY_SUCCESS:
            return({
                ...state,
                loading:false,
                category:action.payload
            })

       case LOAD_ALL_PRODUCT_SUCCESS:
          return({          
              ...state, 
              loading:false,
              product:[...state.product,...action.payload]
          })
      
      
       case LOAD_PRODUCT_DETAIL_SUCCESS:
          return({
              ...state, 
              loading:false,
              productData:action.payload
              
          })
      
      
       case ADD_TO_CART_SUCCESS:
       case LOAD_CART_ITEM_SUCCESS :
          return({
              ...state, 
              loading:false,
              cartItem : action.payload
              
          })
     
     
        case LOAD_CARD_DETAILS_SUCCESS:
            return ({
                ...state,
                cartItemDetails : action.payload,
                loading:false
            })
      

        case DELETE_CART_ITEM_SUCCESS :
            return ({
                ...state ,
                loading:false,
            
            })
       
            case DELETE_ALL_CART_ITEM_SUCCESS :
            return ({
                ...state ,
                loading:false,
                cartItem:[],
                cartItemDetails :[]
            })

            case SEARCH_PRODUCT_SUCCESS :
                return ({
                    ...state,
                    loading:false,
                    searchedItem:action.payload
                })

                case SEARCH_PRODUCT_FAILED :
                    return ({
                        ...state,
                        loading:false,
                        searchedItem:[],
                        error:action.payload

                    })
                
        case DELETE_ALL_CART_ITEM_FAILED:
        case DELETE_CART_ITEM_FAILED :
        case LOAD_CARD__DETAILS_FAILED :
  
        case LOAD_ALL_PRODUCT_FAILED:
        case LOAD_CATEGORY_FAILED :
        case LOAD_CART_ITEM_FAILED :
        case ADD_TO_CART_FAILED:
        case LOAD_PRODUCT_DETAIL_FAILED:
               
          return({
              ...state, 
              loading:false,
              error:action.payload
              
          })

          case REMOVE_ERROR_FOR_PRODUCT:
            return{
              ...state,
              error:null
            }
           
       default:
         return state;
         break;
     }
  
  
  }