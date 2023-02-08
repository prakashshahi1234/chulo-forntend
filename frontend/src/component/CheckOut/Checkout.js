// check out page where showing adress detils and payment selection details
// actually two component here
import React, { useEffect, useState } from "react";
import "./checkout.css";
import FillDetailAdress from "../user/fill-detail/FillDetailAdress";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useSelector, useDispatch } from "react-redux";
import { getStatusOfApplication, getUserAdress } from "../../redux/actions/userAction";
import { deleteCartItem } from "../../redux/actions/productAction";
import { Button, Divider } from "@mui/material";
import { useAlert } from "react-alert";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import esewaPayment from "../payment/esewa";
import checkousession from "../payment/card";
import cashOnDelivary from "../payment/cd";
import Loading from "../loading/Loading";
import { setLocation } from "../../redux/actions/userAction";
import locationguide from '../../redux/actions/locationguide.gif'
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

function Checkout() {
  const { adress, error, user , status} = useSelector((state) => state.userReducer);
  const { cartItemDetails, loading } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // to load adress
  useEffect(() => {
    
    !adress && user && dispatch(getUserAdress());
     
  }, [user]);

  //
  useEffect(() => {
    cartItemDetails?.length === 0 && !loading && navigate("/");
  }, [cartItemDetails]);

  // show error id happern
  useEffect(() => {
    if (error) {
      alert.show(error);
    }
  }, [error]);

  useEffect(()=>{
    dispatch(getStatusOfApplication())

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
   
      if(result.state==="denied"){
        alert.show(<div >
          <p>Allow location for better  experience.</p>
          {/* <img src={locationguide}  /> */}
          </div>,
        {timeOut:150000})
      }
      })
  },[])


  const heightOfwindow = document.body.scrollHeight;

  useEffect(()=>{
    const widthOfwindow = window.innerWidth;
    const heightOfwindow = document.body.scrollHeight;
    if(widthOfwindow<600){
      window.scrollTo(0, heightOfwindow);
    }else{

    }
   },[heightOfwindow])
  // const [fillAganin, setfillAgain] = useState(false);
  const totalPrice =
    cartItemDetails &&
    cartItemDetails.reduce((a, c) => {
      return a + c.quantity * c.price;
    }, 0);

  return (
    <div className="checkout-outer-flex">
      <div className="cart">
        {cartItemDetails &&
          cartItemDetails.map((item, key) => {
            return (
              <>
                {loading === true ? (
                  <Loading />
                ) : (
                  <div key={key} className="bottom-div">
                    {item.imagesrc[0].type === "image" && (
                      <img
                        src={item.imagesrc[0].src}
                        height={""}
                        width={"100px"}
                      />
                    )}
                    {item.imagesrc[0].type === "video" && (
                      <video
                        src={item.imagesrc[0].src}
                        height={""}
                        width={"100px"}
                        autoPlay="true"
                        muted
                      />
                    )}
                    <div className="cart-item-details">
                      <p
                        onClick={() => {
                          return navigate(
                            `../product-detail/${item.productId}/${item.name}`
                          );
                        }}
                      >
                        {item?.name}
                      </p>
                      <p>
                        {item?.size}/{item?.color}
                      </p>
                      <p>Rs {item?.price * item?.quantity}</p>
                      <div className="item-controller">
                        <div className="item-quantity">
                          <p> {"Quantity : " + item?.quantity} </p>
                        </div>
                        <button style={{background:"red" ,padding:"10px" ,color:"white"}} onClick={()=>{return(dispatch(deleteCartItem(item?.id)),cartItemDetails.length===1 && window.location.reload() ,alert.success("Item removed."))}}>Remove</button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
      </div>
        <div>
       
        {adress && status?.filter(item=>item.workName==="Order Placed")[0]?.status===1 && (
          <div className="adress-for-checkout">
            <p>Your Shipping Adress.</p>
            <div>
           
              <p>Province : {adress?.province}</p>
              <p>District : {adress?.district}</p>
              <p>Localstate : {adress?.localstate}</p>
              <p>WardNo : {adress?.wardNo}</p>
              <p>Steet Line : {adress?.streetName}</p>
              <p>Reference : {adress?.reference}</p>
              <p>
                <b>Delivary Charge : Rs.{adress?.delivaryCharge}</b>
              </p>
              {adress && totalPrice && (
                <div className="pay-info">
                  <p>
                    Sub Total :<b> Rs {totalPrice}</b>
                  </p>
                  <p>
                    Delivary Charge :
                    <b> Rs {adress && adress.delivaryCharge}</b>
                  </p>
                  <hr />
                  <p>
                    Grand Total :
                    <b> Rs {adress?.delivaryCharge + totalPrice}</b>
                  </p>
                </div>
              )}
              
        {status?.filter(item=>item.workName==="Order Placed")[0]?.status===1 && adress && totalPrice && pathname !== "/checkout/payment" && (
                <button
                  className="btn"
                  onClick={() => {
                 totalPrice+adress?.delivaryCharge>=150 ? 
                     navigate("/checkout/payment"):
                     alert.error(`Minimum Amount is 150.Your order amount is ${ totalPrice+adress?.delivaryCharge}.Shop other food of amount ${150-totalPrice-adress?.delivaryCharge} to place order` , {timeout:10000});
                  }}
                >
                  Continue
                </button>
              )}
             
            </div>
            <Divider>or</Divider>
            {pathname !== "/checkout/payment" && (
              <button
                className="btn change-adress-btn"
                onClick={() => {
                  navigate("/set-up-details");
                }}
              >
                Change Adress
              </button>
            )}
          </div>
        )}
         {status?.filter(item=>item.workName==="Order Placed")[0]?.status===0 && 
              <div className="inconvinience">
              <h3 className="inconvinience-title">Unable to take order.</h3>
                <p className="inconvinience-paragraph">
                  Dear customer , We sincerely apologize for any inconvenience
                   you may have experienced due to maintenance.
                </p>
                </div>
              }

        {!adress && !loading && navigate("/set-up-details")}
      </div>

      <Outlet />
    </div>
  );
}

export default Checkout;



const printDiv = ( name, adress, product, amount) => {

  var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "Chulos Bill",
      orientationLandscape: false,
      compress: true,
      logo: {
          src: "/logo192.png",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 30.33, //aspect ratio = width/height
          height: 30.66,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
    //  stamp: {
    //       inAllPages: true, //by default = false, just in the last page
    //       src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
    //       type: 'JPG', //optional, when src= data:uri (nodejs case)
    //       width: 15, //aspect ratio = width/height
    //       height: 15,
    //       margin: {
    //           top: 0, //negative or positive num, from the current position
    //           left: 0 //negative or positive num, from the current position
    //       }
    //   }, 
      business: {
          name: "Chulo Food Delivery",
          address: "Birendranagar -04 Yeri Chowk Surkhet",
          phone: "9868101273",
          email: "info@chulo.com",
          website: "www.chulo.com",
      },
      contact: {
          label: "Invoice issued for:",
          name: name,
          address: adress?.area,
          phone: adress?.reference,
          email: "",
          otherInfo: "",
      },
      invoice: {
          label: "Invoice : ",
          num:1,
          invDate: Date(),
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#", 
              style: { 
                width: 10 
              } 
            }, 
            { 
              title: "Title",
              style: {
                width: 35
              } 
            }, 
            { title: "Unit"},
            { title: "Price"},
            { title: "Quantity"},
         
            { title: "Total"}
          ],
          table: product?.map((item, index)=>([
              index + 1,
             item.itemName,
             item.size,
             item.price,
             item.quantity,
           
              item?.price * item.quantity
          ])),
          additionalRows: [{
              col1: 'Total:',
              col2:(amount-adress.delivaryCharge).toString(),
              col3: '',
              style: {
                  fontSize: 14 //optional, default 12
              }
          },
          {
              col1: 'Delivery Charge:',
              col2:adress?.delivaryCharge.toString(),
              style: {
                  fontSize: 10 //optional, default 12
              }
          },
          {
              col1: 'Grand Total:',
              col2: amount.toString(),
              col3: '',
              style: {
                  fontSize: 10 //optional, default 12
              }
          }],
          invDescLabel: "Invoice Note",
          invDesc: "",
      },
      footer: {
          text: "",
      },
      pageEnable: true,
      pageLabel: "Page ",
  };

  const pdfObject = jsPDFInvoiceTemplate(props); 
  pdfObject.jsPDFDocObject.save()
  

};




export const ChoosePaymentMethod = () => {
  const { cartItemDetails, cartItem } = useSelector(
    (state) => state.productReducer
  );
  const alert = useAlert();
  const navigate = useNavigate();
  const { adress, user, error  , location} = useSelector((state) => state.userReducer);
  const totalPrice =
    cartItemDetails &&
    cartItemDetails.reduce((a, c) => {
      return a + c.quantity * c.price;
    }, 0);

  const [orderObj, setorderObj] = useState(null);


  useEffect(() => {
    cartItemDetails?.length === 0 || (!cartItemDetails && navigate("/"));
  }, [cartItemDetails]);

  // to make instance of item for card payment
  useEffect(() => {
    if (cartItem && cartItemDetails && user && adress) {
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
      const name = cartItemDetails.map((item) => {
        return item.name;
      });
      const description = cartItemDetails.map((item) => {
        return item.description;
      });
      const price = cartItemDetails.map((item) => {
        return item.price;
      });
      const imagesrc = cartItemDetails.map((item) => {
        return item.imagesrc;
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
            name: name[i],
            description: description[i],
            price: price[i],
            imagesrc: imagesrc[i],
          },
        ];
      }

      const orderObj = {
        adressId: adress.id,
        userId: user.id,
        item,
        method: "Card",
      };

      setorderObj(orderObj);
    }
  }, [cartItem, cartItemDetails, user, adress]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.show(error);
    }
  }, [error]);

  const contentStyle = {
    background: "var(--border-color)",
    height: "150px",
    width: "300px",
  };
  const overlayStyle = { background: "rgba(0,0,0,0.8)" };
  const arrowStyle = { color: "#0000" };


  return (
    <>
    <div className="x">
      <h2>Choose Payment Method</h2>
     { <div className="checkout">
        <Popup
          position="right down"
          open={false}
          offsetY={100}
          trigger={<button className="btn"> By Esewa</button>}
          {...{ overlayStyle, contentStyle, arrowStyle }}
          nested
          modal
        >
          <div className="popup-div">
            <p>You will be redirected to esewa website.</p>
            <Button
              className="btn"
              onClick={() => esewaPayment(totalPrice, adress.delivaryCharge , alert)}
            >
              Continue
            </Button>
          </div>
        </Popup>
        <Popup
          position="right down"
          open={false}
          offsetY={100}
          trigger={<button className="btn"> By Card</button>}
          {...{ overlayStyle, contentStyle, arrowStyle }}
          nested
          modal
        >
          <div className="popup-div">
            <p>You will be redirected to payment.</p>
            <Button
              className="btn"
              onClick={() => checkousession(orderObj, adress.delivaryCharge ,totalPrice, alert)}
            >
              Continue
            </Button>
          </div>
        </Popup>
        <Popup
          position="right down"
          open={false}
          offsetY={100}
          trigger={<button className="btn"> Cash On Delivary</button>}
          {...{ overlayStyle, contentStyle, arrowStyle }}
          nested
          modal
        >
          <div className="popup-div">
            <p>All process has completed. click place order button.</p>
            <Button
              className="btn"
              onClick={() =>
              {return ( cashOnDelivary(
                  dispatch,
                  orderObj,
                  adress?.delivaryCharge,
                  adress?.reference,
                  totalPrice,
                  alert,
                  location
                )
              )
            }
              }
            >
              Place Order
            </Button>
          </div>
        </Popup>
      </div>}
    </div>
    </>
  );
};


