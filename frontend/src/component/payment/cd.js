import { useDispatch } from "react-redux";
import { deleteALLCart } from "../../redux/actions/productAction";
import {placeOrder}  from '../../redux/actions/userAction'
var uuid = require('uuid');
export default async function CashOnDelivary(dispatch , orderObj , delivaryCharge , phone ,totalPrice, alert , location){
   
    // if(totalPrice+delivaryCharge<200) return alert.error("Minimum Amount is 200.")

    const item = orderObj.item.map((item)=>({
         sizeId:item.sizeId,
         productId:item.productId,
         quantity:item.quantity,
         colorId:item.colorId
    }))
    const orderObjFinal = {
        adressId: orderObj.adressId,
        delivaryCharge: delivaryCharge,
        paymentId:`Cash-On-Delivary-${uuid.v1()}` ,
        phone: phone,
        item,
        method: "Cash On Delivary",
        location
      };
      
    dispatch(  placeOrder({...orderObjFinal}));
      dispatch(deleteALLCart())
      return ;

}
