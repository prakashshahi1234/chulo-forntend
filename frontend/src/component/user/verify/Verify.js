import React,{useState, useEffect} from 'react';
import { useParams  , useNavigate} from 'react-router-dom';
import "./sendotp.css";
import {useDispatch, useSelector} from "react-redux";
import { verifyUser } from '../../../redux/actions/userAction';
import {useAlert} from "react-alert";
function Verify() {

    const {isAuthenticated , error} = useSelector(state => state.userReducer)

    
   const navigaate = useNavigate();
    const dispatch = useDispatch()
    const [otp,setotp] = useState(null);
    const {adress} = useParams();
    const alert = useAlert();
    const verify = (e)=>{

           e.preventDefault();

           dispatch(verifyUser(`${adress}` , otp));
           
    }

    useEffect(() => {    
       

        if (isAuthenticated) {
             navigaate("/")            
        }
        if(error) {
            if(error==='Request failed with status code 401' || error==="...."){

            }else{

                alert.error("Error Occured. Check your phone and try again.")

            }
        }
      }, [isAuthenticated , error,dispatch]);


    return (
        <div className='outer-div-send-otp'>
             <h2>Verify Your identity</h2>
             <div className='inner-div-send-otp'>
                 <p>We send otp to your Phone {adress}. So check your Message and fill this form.</p>
                   <form onSubmit={verify}>
                       <input placeholder='enter opt here' type="number" maxLength={6} minLength={6} onChange={(e)=>setotp(e.target.value)}  required/>
                       <button className='submit-otp' type="submit"> Verify</button>
                   </form>
                   {/* <button className='send-otp-again'>Send Otp Aganin</button> */}
                   
             </div>
        </div>
    )
}

export default Verify;
