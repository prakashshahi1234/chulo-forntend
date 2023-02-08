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
} from "../../redux/actions/productAction";
import Loading from "../loading/Loading";
import {
  getUserAdress,
  placeOrder,
} from "../../redux/actions/userAction";
import axios from "axios";
import { useAlert } from "react-alert";
import {Helmet} from 'react-helmet'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import slider1 from './image/slider-1.jpeg'
import slider2 from './image/slider2.jpg'



function Home() {
  const sliderRef = useRef("");
  const xref = useRef("");
  const dispatch = useDispatch();
  const { loading, adress } = useSelector((state) => state.userReducer);
  const { product, cartItem, cartItemDetails } = useSelector(
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

  useEffect(() => {
    if (url === "https://chulofood.com.np/") {
      window.onscroll = function (ev) {
      
        if (window.innerHeight + window.scrollY+100 >= document.body.offsetHeight) {
          window.location.href === "https://chulofood.com.np/" &&
            dispatch(loadAllProduct());
          window.location.href === "https://chulofood.com.np/" &&
            setshowLower(true);
        }
      };
    }
  }, [url]);

  useEffect(() => {
    if (loading === false) {
      setshowLower(false);
    }
  }, [loading, product]);

  //seo variables
  const title = 'Chulo.com . Your Cloud Kitchen'
  const description="Chulo is cloud kitchen service provider in Surkhet Nepal.Get your favourite food."
  const keyword = "chulo.com"
  const subject = 'Cloud Kitchen and food delivery service.'
  const companyName = "Chulo Surkhet"
  const companyEmail = 'info@chulo.com'
  const domainUrl ="chulo.com"
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
         <meta name="topic" content="Online Shopping in Nepal"/>
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
                 <div onClick={()=>{}}><img src={slider1} height="auto" width="100%" alt=""/></div>
                 <div onClick={()=>{}}><img src={slider2} height="auto" width="100%" alt=""/></div>
              
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
          )}
        </div>
      )}

  <MessengerCustomerChat
           pageId="107782228798600"
           appId="1456227768240129"
 
        />
    </div>
  );
}
export default Home;