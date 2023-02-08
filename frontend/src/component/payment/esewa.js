import axios from "axios";

export default async function esewaPayment (amount ,delivaryCharge){
  


    if(amount+delivaryCharge<200) return alert("Minimum Amount is 200.")

  const {data }  = await axios.get("/api/v1/store-payment");


    // alert(JSON.stringify(data))
    sessionStorage.setItem("productId" ,data.result.productId )
    sessionStorage.setItem("tableId" ,data.result.id )

    
var path="https://uat.esewa.com.np/epay/main";
const suc_url  = 'https://ecomerce.prakashshahi.tk/';
const fail_url = 'https://ecomerce.prakashshahi.tk/';

var params= {
    amt: amount,
    psc: 0,
    pdc: delivaryCharge,
    txAmt: 0,
    tAmt: parseInt(amount)+parseInt(delivaryCharge),
    pid: data.result.productId,
    scd: "EPAYTEST",
    su: suc_url,
    fu:fail_url 
}

data && post(path, params)


}



function post(path, params) {

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}