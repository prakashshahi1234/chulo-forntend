import axios from "axios";

import {loadStripe} from "@stripe/stripe-js"

const stripepromise = loadStripe("pk_test_51LgGw6EHc5aFQbSjuEdJ8qRTQD5pGLNs6rTLwd0ZfQpH6t4MdvE0Vi81YhO0y3zRG89BchgnZygkVwgdthow8N9L001bXiboki")

export default async function checkousession(card , delivaryCharge){

    const stripe  =await stripepromise;

    const {data} = await axios.post("/api/v1/checkout",{  email:"prakashkumarshahi152207@gmail.com", item:card , delivaryCharge});

    const result = await stripe.redirectToCheckout({

        sessionId:data.id
        
    })

    if(result.error){

        console.log(result.error.message)

    }
}
