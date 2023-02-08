import React,{useState,useRef, useEffect} from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GoogleLogin } from '@react-oauth/google';

import "./login.css";
import { useNavigate } from "react-router-dom";
import { Link } from '@mui/material';
import facebokIcon from "../images/facebookIcon.png";
import googleIcon from "../images/googleIcon.png";
import loadingSvg from "../images/loading.svg";
import {useSelector , useDispatch } from "react-redux"; 
import {loginUser}  from '../../../redux/actions/userAction';
import { LOGIN_USER_SUCCESS} from "../../../redux/constants/userConstant"
import axios from "axios"
import {useAlert} from 'react-alert';
import Loading from '../../loading/Loading';
import {Helmet} from 'react-helmet'
function Login() {
    
    const [email,setemail]  = useState("");
    const {isAuthenticated , error , loading} = useSelector(state => state.userReducer)
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const alert = useAlert();
   
    useEffect(()=>{
    
        if(isAuthenticated){
           navigate(-1)
        }
        if(error && error !=="Request failed with status code 401"){
            alert.error(error)
        }
    },[isAuthenticated , error])
 
    const [password,setpassword]  = useState("");
    const [animate,setanimate]  = useState(false);
    const [eyeopen,seteyeopen] = useState(false);
    const showBtnRef = useRef("");
    
    const responseGoogle=async(response)=>{
        alert.success("Login Successfull.")
        const {data} =  await  axios.post('api/v1/register', { },

         {
           headers: {
             Authorization:response.credential
           }
         })
       
    dispatch({type:LOGIN_USER_SUCCESS , payload: data?.user})
     
  }

    const login=(e)=>{
        setanimate(true);
        e.preventDefault();
        const countryCode = "+977"
        if(email.length===10 && password){

            dispatch(loginUser(`+977${email}` , password))

        }else{           
             !email &&  alert.error( <div style={{textTransform:"lowercase"}}>Enter Phone.</div>)
             email.length!==10 &&  alert.error( <div style={{textTransform:"lowercase"}}>Enter Correct Phone No </div>)
             !password || password.length <6 &&  alert.error( <div style={{textTransform:"lowercase"}}>password must be greater than 6.</div>)
           }

    }

    const showPassword =()=>{   
        console.log(showBtnRef.current)
        if(showBtnRef.current.type==="password"){
            return(showBtnRef.current.type="text",seteyeopen(true))
        
            
        }else{
           return(seteyeopen(e=>!e), showBtnRef.current.type="password")
        }
    }

    const title = 'Log in - Chulo.com'
    const description="login into your account and start enjoy your favourite food."
    const keyword = "chulo.com , chulo  , online food in surkhet, surkhet , online food delivery in surkhet"
    const subject = 'Login'
    const companyName = "chulo.com"
    const companyEmail = 'info@chulo.com'
    const domainUrl ="https://chulo.com"

    return (
       <>
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
         <meta name="category" content="food delivery and cloud kitchen"/>
         <meta name="coverage" content="Nepal"/>
         <meta name="distribution" content="local"/>
      </Helmet>
      {<div className='login' >
            <div className='left-login'>
                <div className='email'>
                    <div><h3>Login with phone</h3><p>New Here?<Link  className="link-tag" onClick={()=>navigate("/register")}> <b>Register</b></Link></p></div>
                    <form  onSubmit={login} method='post'>
                        <li> <label htmlFor="email">Phone (only from nepal)</label><input  onChange={(e)=>{setemail(e.target.value)}} type="number"        id="email" required/></li>
                        <li className='password-field'> <label htmlFor="password">Password</label>
                        <input ref={showBtnRef}   onChange={(e)=>{setpassword(e.target.value)}} type="password" id="password" minLength={7} required/>
                         {eyeopen===true? 
                            <VisibilityOffIcon  onClick={showPassword} className='show-pass-icon'/>:
                            <VisibilityIcon onClick={showPassword} className='show-pass-icon'/>}

                        </li>
                        <li><input type="submit" value="Login" /></li>
                        <li onClick={()=>navigate("/forget-password")} ><Link  className="link-tag" to="/forget-password">Forget Password?</Link></li>

                    </form>
                </div>
                <div className='or-section'><span></span>or<span></span></div>
             
                     <GoogleLogin
                            onSuccess={credentialResponse => {
                                responseGoogle(credentialResponse)
                            }}
                            onError={() => {
                              console.log('Login Failed');
                            }}
                            useOneTap
                          />;
               
            </div>
            {/* <div className='right-login'>
                <img src="https://bit.ly/3ffsXVC" height={"500px"}  width="400px"/>
            </div> */}
        </div>}
        </>
    )
}

export default Login
