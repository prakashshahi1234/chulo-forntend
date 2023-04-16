import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Avtar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FillDetailAdress from "../fill-detail/FillDetailAdress";
import { Button, Input, Table, TableHead, TableRow } from "@mui/material";
import Loading from "../../loading/Loading";
import { googleLogout } from '@react-oauth/google';

import {
  logoutuser,
  getUserAdress,
  getOrderDetails,
} from "../../../redux/actions/userAction";
import "./profile.css";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isAuthenticated,
    loading,
    user,
    adress,
    orderedItem,
    orderItemDetails,
  } = useSelector((state) => state.userReducer);



  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, dispatch]);

  const logOut = () => {
    dispatch(logoutuser());
    googleLogout();
    navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      var arrOfOrderObj = [];

      orderedItem?.forEach((itemS) => {
        itemS.item.map((item) => {
          item.paymentId = itemS.paymentId;
          item.id=itemS.id;
          item.inPackaging=itemS.inPackaging;
          item.isrecieved=itemS.isrecieved;
          item.isCancled=itemS.isCancled;
          item.isDeliver=itemS.isDeliver;
          arrOfOrderObj = [...arrOfOrderObj, item]

        });
      });

      arrOfOrderObj.length >= 1 && dispatch(getOrderDetails(arrOfOrderObj));

      dispatch(getUserAdress());

    }
  }, [isAuthenticated, orderedItem]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="user-profile">
          <div className="user-details">
            <div className="normal-info">
              <div>
                <Avtar
                  alt={user?.name}
                  sx={{ background: "blue", color: "white" }}
                  // src={user && user?.name?.toUpperCase()}
                />
                <div>
                  <p>{user?.name}</p>
                  <p>{user?.identity}</p>
                </div>
              </div>
              <Button className="log-out-btn" onClick={logOut}>
                Log out
              </Button>
            </div>
            {!adress ? (
              <FillDetailAdress />
            ) : (
              <div className="adress-info">
                <h2>Adress </h2>
                <div className="adress">
                  <ul>
                    <li> {adress?.district}  , {adress?.province}{"   "},{adress?.localstate} {" - " }
                    {adress?.wardNo}{" , "}   {adress?.area}{" , "}   {adress?.streetName} 
                    
                    </li>
                    <li>Reference : {adress?.reference} </li>
                  </ul>
                </div>
                <Button
                  className="adress-edit-btn"
                  onClick={() => {
                    navigate("/set-up-details");
                  }}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
          {orderItemDetails && (
            <div className="order-details">
              <div>
                <table
                  className="order-table"
                  border="1px solid lightgrey"
                  cellSpacing={"0"}
                  cellPadding="3px"
                >
                  <caption>Your Order Details.</caption>
                  <thead>
                    <tr>
                      <th>SN</th>
                      {/* <th>Id</th> */}
                      <th>Image</th>
                      <th> Name</th>
                      <th>  Quantity</th>
                      <th>Size</th>
                      <th> Price per item</th>
                      <th> Delivered At</th>
                      {/* <th>Paid Amount</th> */}
                      {/* <th>Payment Id</th> */}
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItemDetails &&
                      orderItemDetails.sort(function(a,b){return a.id-b.id}).map((item, key) => {
                        
                        return (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            {/* <td>{uuidv4()}-<b style={{color:"green"}}>{item.id}</b></td> */}
                            <td>
                              <img
                                height={"100px"}
                                src={item?.imagesrc[0]?.src}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td> {item.quantity}</td>
                            <td>
                              {item.size}
                            </td>
                            <td>Rs. {item.price}</td>
                            
                            <td> 30min to 1 hrs.</td>
                            {/* <td>{item.amount  || "0"}</td> */}
                            {/* <td>{item.paymentId.substring(0,16)+"..."+item.paymentId.substring(item.paymentId.length-5 , item.paymentId.length-1)}</td> */}
                            <td style={{fontWeight:"bold" , color:'green'}}>
                              {/* {item.inPackaging} */}
                              {/* {item.isDeliver} */}
                              {item.isCancled ===1 &&<p> This order has cancled. </p>}
                              {item.inPackaging ===0 && item.isCancled ===0&&<p> We Recieved your order. </p>}
                             {item.isDeliver===0 && item.inPackaging ===1 && <p> Your order is In Packaging.</p>}
                             {item.inPackaging ===1 &&  item.isDeliver ===1 && <p> Your order is Delivering to you.</p>}
                              
                              </td>
                          </tr>
                        );
                      })}

                  </tbody>
                </table>

              </div>
            </div>
          )}
          <div className="saved-item"  style={{margin:"auto" , display:'flex' , width:"300px" , color:"black" ,alignItems:"center"  , textAlign:"center"}} >
          { !orderItemDetails && <Button onClick={()=>{window.location.reload()}}> Load Order</Button>}
          { orderedItem?.length===0 && <Button > No Order.</Button>}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
