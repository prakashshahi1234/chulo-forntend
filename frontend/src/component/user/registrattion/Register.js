import React,{useState,useRef,useEffect} from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GoogleLogin } from '@react-oauth/google';
import "../login/login.css";
import { Link } from '@mui/material';
import {useNavigate,Outlet} from "react-router-dom";
import loadingSvg from "../images/loading.svg";
import {useDispatch , useSelector}  from 'react-redux';
import axios from 'axios';
import {LOGIN_USER_SUCCESS}  from "../../../redux/constants/userConstant";
import {register } from "../../../redux/actions/userAction";
import {useAlert} from 'react-alert';
import {Helmet} from 'react-helmet'

function Register() {
    const dispatch = useDispatch();
    // const  user  = useSelector(state=>state?.userReducer?.user);
    const {isAuthenticated, error  ,loading} = useSelector(state => state.userReducer)
    const user = useSelector(state => state.userReducer?.user)

    const [email,setemail]  = useState("");
    const [name,setname]  = useState("");
    const navigate = useNavigate();
    const [password,setpassword]  = useState("");
    const [animate,setanimate]  = useState(false);
    const [eyeopen,seteyeopen] = useState(false);
    const showBtnRef = useRef("");
    const alert =useAlert()
    
    useEffect(()=>{

        if(user?.sendOtp===true && user?.identity ){

            navigate(`/verify/${user?.identity}`)
            
        }   
          
    },[user?.identity, user?.sendOtp])
    
    useEffect(()=>{
        if(isAuthenticated) {
            navigate("/")
        }
        if(error && error !=="Request failed with status code 401"){
            alert.show(error)
        }
    
    },[isAuthenticated, error])
     
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


    // register by phone
    const registerSubmit = (e) => {
        e.preventDefault();
        const validFormat  = /^[a-zA-Z\s]*$/;

        if(email.length===10 && password && name.match(validFormat)){
        
        dispatch(register(`+977${email}`,password , name));

       }else{           
         !email &&  alert.show("Enter Phone.")
         email.length!==10 &&  alert.show("Enter Correct Phone No")
         !password || password.length <6 &&  alert.show("password must be greater than 6.")
         !name.match(validFormat) && alert.show("In Name you can use only alphabate.")
       }
      ;}
    
    
    const showPassword =()=>{   
       
        if(showBtnRef.current.type==="password"){

            return(showBtnRef.current.type="text",seteyeopen(true))   

        }else{

           return(seteyeopen(e=>!e), showBtnRef.current.type="password")

        }
        
     }
     const title = 'Register - Chulofood.com.np'
    const description="Regiter  your account in chulo.com and start enjoy your favourite food."
    const keyword = "chulo.com register, chulo.com , chulo  , online food in surkhet, surkhet , online food delivery in surkhet"
    const subject = 'Login'
    const companyName = "chulofood.com.np"
    const companyEmail = 'info@chulofood.com.np'
    const domainUrl ="https://chulofood.com.np"

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
         <meta name="owner" content="Chulofood.com.np"/>
         <meta name="url" content={domainUrl}/>
         <meta name="identifier-URL" content={domainUrl}/>
         <meta name="directory" content="submission"/>
         <meta name="category" content="food delivery and cloud kitchen"/>
         <meta name="coverage" content="Nepal"/>
         <meta name="distribution" content="local"/>
      </Helmet>
           <Outlet/> 
           {<div className='login'>
            <div className='left-login'>
                <div className='email'>
                    <div><h3>Register with Phone</h3> <p> Alerady Register ?<Link className="link-tag" onClick={()=>navigate("/login")}><b>Login</b></Link></p></div>
                    <form  onSubmit={registerSubmit}>
                        <li> <label htmlFor="name">Enter Name</label><input  onChange={(e)=>{setname(e.target.value)}} type="name"  id="name" required /></li>
                        <li> <label htmlFor="email">Phone  (only from Nepal)</label><input  onChange={(e)=>{setemail(e.target.value)}} type="number"  id="email" required /></li>
                        <li className='password-field'> <label htmlFor="password"> Create Password</label>
                        <input ref={showBtnRef}   onChange={(e)=>{setpassword(e.target.value)}} type="password" id="password" minLength={7} required/>
                         {eyeopen===true? 
                            <VisibilityOffIcon  onClick={showPassword} className='show-pass-icon'/>:
                            <VisibilityIcon onClick={showPassword} className='show-pass-icon'/>}

                        </li>
                        <li>{animate===false?<input  type="submit" value="Register" />:<button className='animated-btn'><img height={"30px"} src={loadingSvg} disabled/></button>}</li>
                        <li style={{textAlign:"center"}}><small>Registering by accepting <a href='/privacy.html' target={"_blank"}> terms and condition.</a></small></li>
                    </form>
                </div>
                <div className='or-section'><span></span>or<span></span></div>
                {/* korean training project */}
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
                <img src="https://bit.ly/342mg79" height={"500px"} />
            </div> */}
            </div>}

    </>
    )
}

export default Register;
