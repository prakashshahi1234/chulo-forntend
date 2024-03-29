import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../productCard/Card";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteALLCart,
  loadAllProduct,
  SearchItem
} from "../../redux/actions/productAction";
import Loading from "../loading/Loading";
import {
  getUserAdress,
  placeOrder,
} from "../../redux/actions/userAction";
import axios from "axios";
import { useAlert } from "react-alert";
import {Helmet} from 'react-helmet'
import slider1 from './image/slider-3.png'
import slider2 from './image/slider2.jpg'
import slider4 from './image/slider-4.png'
import { useNavigate , useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { LOGIN_USER_SUCCESS } from "../../redux/constants/userConstant";
function Home() {
  const navigate = useNavigate()
  const sliderRef = useRef("");
  const xref = useRef("");
  const dispatch = useDispatch();
  const { loading, adress ,isAuthenticated} = useSelector((state) => state.userReducer);
  const { product, cartItem, cartItemDetails  , category} = useSelector(
    (state) => state.productReducer
  );
  const alert = useAlert();
  const [showLower, setshowLower] = useState(false);
  const [orderMessage, setorderMessage] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  // load initial product
  useEffect(() => {
    dispatch(loadAllProduct());
    dispatch(getUserAdress());

   
    

  }, []);

//    useGoogleOneTapLogin({
//     onSuccess: async credentialResponse => {
     
//         alert.success("Login Successfull.")

//         const {data} =  await  axios.post('api/v1/register', { },{headers: {Authorization:credentialResponse.credential}})
       
//     dispatch({type:LOGIN_USER_SUCCESS , payload: data?.user})
     
//   }
// })

  const urlParams = new URLSearchParams(window.location.search);
const pageSize = urlParams.get('fbclid');

  useEffect(()=>{
 if(pageSize){
  window.location.replace("https://chulofood.com.np")

 }
  },[pageSize])

  const [location , setLocation] = useState({})

 

  const { oid, refId, amt } = new Proxy(
    new URLSearchParams(window.location.search),
    {
      get: (searchParams, prop) => searchParams.get(prop),
    }
  );

  const [processed, setprocessed] = useState(false);

  useEffect(async () => {
    setprocessed(true);
    if (oid && amt && refId && cartItem && cartItemDetails) {
      const tableId = parseInt(sessionStorage.getItem("tableId"));

      const obj = { amount: amt, productId: oid, referenceId: refId, tableId };

      const { data } = await axios.post("/api/v1/verify-payment", obj);

      dispatch(getUserAdress());

      if (data?.success === true) {
        const colorId = cartItem.map((item, index) => {
          return {
            colorId: item.colorId,
            sizeId: item.sizeId,
            productId: item.productId,
          };
        });

        const quantity = cartItemDetails.map((item) => {
          return item.quantity;
        });

        let item = [];

        for (let i = 0; i <= colorId.length - 1; i++) {
          item = [
            ...item,
            {
              colorId: colorId[i].colorId,
              sizeId: colorId[i].sizeId,
              productId: colorId[i].productId,
              quantity: quantity[i],
            },
          ];
        }

        const orderObj = {
          adressId: adress.id,
          delivaryCharge: adress.delivaryCharge,
          paymentId: oid,
          phone: "9868658059",
          item,
          method: "esewa",
          location:{}
        };

        dispatch(placeOrder(orderObj));

        dispatch(deleteALLCart());
      } else {
        window.location.replace("/user-profile");
      }
    }

    setprocessed(false);
  }, [oid, refId, amt, cartItem, cartItemDetails, adress]);

  
  
  let url = window.location.href;
const u1 = "https://chulofood.com.np/"
const u2 = "https://www.chulofood.com.np/"
// const u1 = "http://localhost:8000/"
// const u2 = "http://localhost:8000/"


  useEffect(() => {
    if (url === u1 || url === u2 ) {
      window.onscroll = function (ev) {
      
        if (window.innerHeight + window.scrollY+100 >= document.body.offsetHeight) {
          if(product?.length<=30){
      
          window.location.href === u1 && dispatch(loadAllProduct());
          window.location.href === u2 && dispatch(loadAllProduct());
          window.location.href === u1 && setshowLower(true);
          window.location.href === u2 && setshowLower(true);
        }
          else{
  
          }
        }
      };
    }
  }, [url, product]);

  useEffect(() => {
    if (loading === false) {
      setshowLower(false);
    }
  }, [loading, product]);

  //seo variables
  const title = 'Chulo Food Delivery | food delivery service in Surkhet'
  const description="Chulo Food Delivery is food delivery service provider in Surkhet Nepal.Get your favourite food."
  const keyword = "chulofood.com.np , chulo food delivery , chulo food , birendranagar"
  const subject = 'Cloud Kitchen and food delivery service.'
  const companyName = "Chulo Food Delivery Surkhet"
  const companyEmail = 'chulofooddelivery@gmail.com'
  const domainUrl ="chulofood.com.np"
  


  return (
    <div>
      <Helmet>
         <title>{title}</title>
         <meta name="description" content={description}/>
         <meta name="keywords" content={keyword}/>
         <meta name="subject" content={subject}/>
         <meta name="copyright"content={companyName}/>
         <meta name="language" content="ES"/>
         <meta name="robots" content="index,follow" />
         <meta name="topic" content="Online food delivery in Nepal"/>
         <meta name="Classification" content="Business"/>
         <meta name="designer" content="Prakash Shahi"/>
         <meta name="copyright"  content="Copyright Reserved 2022" />
         <meta name="reply-to" content={companyEmail}/>
         <meta name="owner" content="Chulo.com"/>
         <meta name="url" content={domainUrl}/>
         <meta name="identifier-URL" content={domainUrl}/>
         <meta name="directory" content="submission"/>
         <meta name="category" content="Online Food Delivery Service"/>
         <meta name="coverage" content="Nepal"/>
         <meta name="distribution" content="local"/>
      </Helmet>  
      <Slider ref={sliderRef} {...settings} style={{overflow:"hidden",width:"100%",margin:"auto",marginTop:"0px",zIndex:1,position:"relative"}}>
                 <div onClick={()=>{}}><img src={slider4} height="auto" width="100%" alt=""/></div>
                 <div onClick={()=>{}}><img src={slider1} height="auto" width="100%" alt=""/></div>
              
             </Slider>
      {loading || processed ? (
        <Loading />
      ) : (
        <div className="trending-cards" ref={xref}>
          <div>
            {product?.map((item, index) => {
              return (
                <Card
                  key={index}
                  productId={item?.productId}
                  src={item.imagesrc[0].src}
                  type={item.imagesrc[0].type}
                  title={item?.name}
                  price={item?.price}
                  size = {item?.size}
                />
              );
            })}
          </div>
          {showLower === true && (
            <div style={{ height: "400px", width: "100%" }}>
              <Loading />
            </div>
          )
          }
          
        </div>
      )}
      <div className="category-list">
        <h3>Choose Category</h3>
        <div>
      { category && product.length>=30 && category?.map((item, key)=>{
          return <Button key={key+"34"} className="button-cat" onClick={()=>{ 
           return( dispatch(SearchItem(item?.id, "category")),
            navigate(`/search/${item.id}` ,{state:{title:item.name}} ))}} 
            >{item.name}</Button>
        })}
        </div>
      </div>


    </div>
  );
}
export default Home;




