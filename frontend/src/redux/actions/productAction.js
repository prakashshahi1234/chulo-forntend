import axios from "axios";
import {
 
LOAD_ALL_PRODUCT_FAILED,
LOAD_ALL_PRODUCT_SUCCESS, 
LOAD_ALL_PRODUCT_REQUEST,
LOAD_PRODUCT_DETAIL_FAILED,
LOAD_PRODUCT_DETAIL_REQUEST,
LOAD_PRODUCT_DETAIL_SUCCESS,
ADD_TO_CART_REQUEST,
ADD_TO_CART_FAILED,
ADD_TO_CART_SUCCESS,
LOAD_CART_ITEM_REQUEST,
LOAD_CART_ITEM_SUCCESS,
LOAD_CART_ITEM_FAILED,
LOAD_CART_DETAILS_REQUEST,
LOAD_CARD_DETAILS_SUCCESS,
LOAD_CARD__DETAILS_FAILED,
DELETE_CART_ITEM_REQUEST,
DELETE_CART_ITEM_SUCCESS,
DELETE_CART_ITEM_FAILED,
DELETE_ALL_CART_ITEM_REQUEST,
DELETE_ALL_CART_ITEM_FAILED,
DELETE_ALL_CART_ITEM_SUCCESS,
SEARCH_PRODUCT_REQUEST,
SEARCH_PRODUCT_FAILED,
SEARCH_PRODUCT_SUCCESS,
LOAD_CATEGORY_REQUEST,
LOAD_CATEGORY_FAILED,
LOAD_CATEGORY_SUCCESS
} from "../constants/productConstants"
const baseUrl = '/api/v1';

// load all product for display
export const loadAllProduct=()=>async (dispatch)=>{
         try {

            dispatch({type:LOAD_ALL_PRODUCT_REQUEST});

            const {data}  = await axios.get(`${baseUrl}/get-short-product`);
                console.log(data)
                dispatch({type:LOAD_ALL_PRODUCT_SUCCESS,payload:data.result})

                
         } catch (error) {
          dispatch({
            type: LOAD_ALL_PRODUCT_FAILED,
            payload: error?.response?.data?.message,
          });
         }

}

// load single product details
export const loadProductDetail=(productId)=>async (dispatch)=>{
         try {

            dispatch({type:LOAD_PRODUCT_DETAIL_REQUEST});

            const {data}  = await axios.post(`${baseUrl}/get-product-detail` ,{productId});
                
                dispatch({type:LOAD_PRODUCT_DETAIL_SUCCESS,payload:data})

                
         } catch (error) {
          dispatch({
            type: LOAD_PRODUCT_DETAIL_FAILED,
            payload: error.response.data.message,
          });
         }

}
     

// add to cart
export const addToCart=(arr)=>async (dispatch)=>{
         try {

            dispatch({type:ADD_TO_CART_REQUEST});

            const {data}  = await axios.post(`${baseUrl}/add-to-cart` ,{arr});
                
                dispatch({type:ADD_TO_CART_SUCCESS,payload:data.result})
                
         } catch (error) {
          dispatch({
            type: ADD_TO_CART_FAILED,
            payload: error.response.data.message,
          });
         }

}

// load cart item
export const loadCartItem=()=>async (dispatch)=>{
  
         try {

            dispatch({type:LOAD_CART_ITEM_REQUEST});

            const {data}  = await axios.get(`${baseUrl}/load-cart`);
                
                dispatch({type:LOAD_CART_ITEM_SUCCESS,payload:data.result})
               
                
         } catch (error) {
          dispatch({
            type: LOAD_CART_ITEM_FAILED,
            payload: error.response?.data.message,
          });
         }

}
// load cartitem details

export const loadCartItemDetail=(arr)=>async (dispatch)=>{
  try {

     dispatch({type:LOAD_CART_DETAILS_REQUEST});

     const {data}  = await axios.post(`${baseUrl}/load-cart-detail` , {arr});
         
         dispatch({type:LOAD_CARD_DETAILS_SUCCESS,payload:data.result})
        
         
  } catch (error) {
   dispatch({
     type: LOAD_CARD__DETAILS_FAILED,
     payload: error.response?.data.message,
   });
  }
}

// delete all cart item

export const deleteALLCart=()=>async (dispatch)=>{
  try {

     dispatch({type:DELETE_ALL_CART_ITEM_REQUEST});

     const {data}  = await axios.get(`${baseUrl}/delete-all-cart`);
         
         dispatch({type:DELETE_ALL_CART_ITEM_SUCCESS})

        //  window.location.replace("/user-profile")

  } catch (error) {
   dispatch({
     type: DELETE_ALL_CART_ITEM_FAILED,
     payload: error.response?.data.message,
   });
  }

}

// delete cart item
export const deleteCartItem=(cartId)=>async (dispatch)=>{
  try {

     dispatch({type:DELETE_CART_ITEM_REQUEST});
       
     const {data}  = await axios.post(`${baseUrl}/delete-cart` , {cartId});

         dispatch({type:DELETE_CART_ITEM_SUCCESS})

         if(data.success===true){

          const data1  = await axios.get(`${baseUrl}/load-cart`);

          dispatch({type:LOAD_CART_ITEM_SUCCESS,payload:data1.data.result})    
          
        }
                
        
         
  } catch (error) {
   dispatch({
     type: DELETE_CART_ITEM_FAILED,
     payload: error.response?.data.message,
   });
  }

}
// delete cart item
export const SearchItem=(name, url)=>async (dispatch)=>{
  try {

     dispatch({type:SEARCH_PRODUCT_REQUEST});

     const {data}  = await axios.post(`${baseUrl}/${url}` , {name});

         dispatch({type:SEARCH_PRODUCT_SUCCESS, payload:data.result})              
               
  } catch (error) {
   dispatch({
     type: SEARCH_PRODUCT_FAILED,
     payload: error.response?.data.message,
   });
  }

}

// load all category
export const loadCategory=()=>async (dispatch)=>{
  try {

     dispatch({type:LOAD_CATEGORY_REQUEST});

     const {data}  = await axios.get(`${baseUrl}/get-category`);

         dispatch({type:LOAD_CATEGORY_SUCCESS, payload:data.result})       
         
  } catch (error) {
   dispatch({
     type: LOAD_CATEGORY_FAILED,
     payload: error.response?.data.message,
   });
  }

}


