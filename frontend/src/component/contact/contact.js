import React from "react";
import "./cnt.css";
import { ImLocation } from "react-icons/im";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";


function ContactUs() {
  const address = "Birendranagar 04 , surkhet";
  const telephone = "9765800411";
  const email = "info@chulofood.com.np";


  return (
    <div className="contactus-main-container">
      <div className="contactus-inner-container">
        <div className="contactus-title-detail-container">
          <h2>Get In Touch With Us</h2>

          <span id="contactus-span-title">
            Contact us for more queries and help
          </span>
        </div>
        <div className="contactus-detail-container">
          <span className="cmn-contactus-detail">
            <ImLocation />
            <span>{address}</span>
          </span>
          <span className="cmn-contactus-detail">
            <BsTelephone />
            <span>{}<a className="link" href={`tel:${telephone}`}>{telephone}</a></span>
          </span>
          <span className="cmn-contactus-detail">
            <HiOutlineMail />

            <span>{email}</span>
          </span>
        </div>
      </div>
  
    </div>
  );
}
export default ContactUs;

