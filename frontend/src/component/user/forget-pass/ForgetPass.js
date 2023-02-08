import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios'
import "./forgetpass.css";

import { useAlert } from 'react-alert';
function ForgetPassword() {
    const [email,setemail] = useState("");
    const [otp,setotp] = useState("");
    const [password,setpassword] = useState("");
    const [rePassword,setrePassword] = useState("");

    // const history = useHistory();
    const emailRef = useRef(null)
    const otpRef = useRef(null)
    const passwordRef = useRef(null)
    const repasswordRef = useRef(null)
    const emailInputRef = useRef(null)
    const otpInputRef = useRef(null)
    const alert = useAlert();

    useEffect(()=>{
        otpRef.current.style.display="none"
        passwordRef.current.style.display="none"
        repasswordRef.current.style.display="none"
    },[])
    
    //  window.addEventListener("keydown", function(event) {
    //     // Number 13 is the "Enter" key on the keyboard
    //     if (event.keyCode === 13) {
    //       // Cancel the default action, if needed
    //       event.preventDefault();
    //       // Trigger the button element with a click
    //      return ;
    //     }
    // })

    const sendOtpForVerify=async(e)=>{
         // prevent default behaviour of form  
        e.preventDefault()

        window.addEventListener("keydown", function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
              // Cancel the default action, if needed
              event.preventDefault();
              // Trigger the button element with a click
             return ;
            }
        })
        
          try {          
                if(email.length===10){       
        
                        // work here for send sms.
                        const {data} =await axios.post("/api/v1/send-otp", {phone:`+977${email}`});
                       
                        if(data.success===true){
                            alert.success('we send otp to your phone fill this in opt.')
                            otpRef.current.style.display="flex"
                            otpInputRef.current.focus()
                            emailInputRef.current.readOnly="true"
                            emailRef.current.style.opacity="0.4"
                            emailRef.current.style.transition="0.4s all"
                            emailRef.current.style.pointerEvents ="none"
                        }
                       
        
              }else{
        
                  alert.error("invalid phone.")
        
              }
        
            } catch (error) {
                alert.error(error.response.data.message)
            }

    }


    const verifyEmail=async(e)=>{
        e.preventDefault()
        window.addEventListener("keydown", function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
              // Cancel the default action, if needed
              event.preventDefault();
              // Trigger the button element with a click
             return ;
            }
        })

        if(otp.length===6){
          try{     

            const {data} =await axios.post("/api/v1/verify-email", {phone:`+977${email}` , otp});
             
            if(data.success===true){
      
               return(  otpInputRef.current.readOnly="true",
                 otpRef.current.style.opacity="0.4",
                 otpRef.current.style.pointerEvents="none",
                 passwordRef.current.style.display="flex" ,              
                 repasswordRef.current.style.display="flex" ) 
      
               }
      
              }catch(error){

              alert.error("Error occured. Check your phone and try again.")

              }
       
        // first verify then work for next

      }else{
          alert.error("otp must be 6 digit.")
      }
    }

   const changePassword=async(e)=>{

    e.preventDefault()
    window.addEventListener("keydown", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
         return ;
        }
    })

    if(rePassword !==password){
        alert.error("password doesnt match")

    }else{
        // work here  for send all thing
        const {data} =await axios.post("/api/v1/forgot-password", {phone:`+977${email}` ,password, otp});
        if(data.success===true){
             alert.error("password changed  successfully.")
             setTimeout(()=>{
                 window.location.replace('/')
             },2000)
        }else{
            alert.error("try again.")
            window.location.reload()
        }

    }
    
   }

    return (
        <div className="forget-password">
            {/* <ToastContainer/> */}
            <h3>Reset/Forget Password</h3>
            <form>
             
                <div ref={emailRef}> 
                    <li>
                    <label for="email">Enter Your Phone</label>
                    <input ref={emailInputRef} onChange={(e)=>{setemail(e.target.value)}} id="email" type="number"/>
                    </li>
                    <button onClick={(e)=>{sendOtpForVerify(e)}}>Send Otp</button>
                </div>
                
                <div ref={otpRef}> 
                <li> 
                    <label for="email">Enter Otp</label>
                    <input ref={otpInputRef}  onChange={(e)=>{setotp(e.target.value)}} id="email" type="number"/>
                </li>
                <button onClick={(e)=>verifyEmail(e)}>Submit Otp</button>
                </div>
                
                <div ref={passwordRef}>
                <li> 
                    <label for="email">Enter Password</label>
                    <input onChange={(e)=>{setpassword(e.target.value)}} id="email" type="password"/>
                </li>
                
                </div>
                
                <div ref={repasswordRef}>
                <li> 
                    <label for="email">Re enter password</label>
                    <input onChange={(e)=>{setrePassword(e.target.value)}} id="email" type="password"/>
                </li>
                <button onClick={(e)=>{changePassword(e)}}>Change Password</button>
                </div>
                  
            </form>
        </div>
    )
}

export default ForgetPassword
