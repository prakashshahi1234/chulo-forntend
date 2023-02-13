import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './footer.css'
import { SocialIcon } from 'react-social-icons';
import { useSelector } from 'react-redux';
function Footer() {
    const {pathname} = useLocation()
    let {product , loading} =useSelector(state=>state.productReducer)
     let l =useSelector(state=>state.userReducer)
     if(loading===false && l.loading ===true){
        loading =true;
     }
     console.log(product.length)
  return (
    <>
    {pathname==="/"  && loading===false && product.length>=30 &&
    <footer className='footer'>     
      <div className='second-div'>
         <div>
            <p>जे खान चाहानुहुन्छ  घर मै पाउनुहुन्छ । </p>
            <a href='tel:+977 98765800411'>+977 98765800411</a>
         </div>
         <div>
            <Link to='/login'>Log in</Link>
            <Link to='/register'>Register</Link>
         </div>
         <div>
            <a target={"_blank"} href='/privacy.html'>Privacy Policy</a>
            <a target={"_blank"} href='/privacy.html'>Terms and condition</a>
            <a target={"_blank"} href='/privacy.html'>cookie policy</a>
         </div>
         <div>
            <h4>Our social</h4>
            <div>
              <SocialIcon style={{margin:"3px" , height:"30px" , width:"30px"}} bgColor='blue' fgColor='white' url='https://facebook.com/chulofooddelivery'/>
              <SocialIcon style={{margin:"3px" , height:"30px" , width:"30px"}} bgColor='black' fgColor='white' url='https://tiktok.com/@chulofooddelivery'/>
              <SocialIcon style={{margin:"3px" , height:"30px" , width:"30px"}} bgColor='red' fgColor='white' url='https://www.youtube.com/@chulofooddelivery'/>
              {/* <SocialIcon url='https://instagram.com/chulofooddelivery'/> */}
              </div>
         </div>
      </div>
      <div className='first-div'>
        <div>
        <small>Cash on delivery.</small>
        <p>Food Delivery Services in Birendranagar Surkhet.</p>
        </div>
        <div>
        <img width={'auto'} height={"100px"} src='https://chulofood.com.np/static/media/nobg-logo.6f6542ca353823e0911d.png'/>
        </div>
      </div>
      <div style={{margin:'auto' , display:"flex" , justifyContent:"center"}}>@2023 Chulo Food Delivery</div>
    </footer>  }

   {pathname!=="/" && loading===false && <footer className='footer'>     
      <div className='second-div'>
         <div>
            <p>जे खान चाहानुहुन्छ  घर मै पाउनुहुन्छ । </p>
            <a href='tel:+977 98765800411'>+977 98765800411</a>
         </div>
         <div>
            <Link to='/login'>Log in</Link>
            <Link to='/register'>Register</Link>
         </div>
         <div>
            <a target={"_blank"} href='/privacy.html'>Privacy Policy</a>
            <a target={"_blank"} href='/privacy.html'>Terms and condition</a>
            <a target={"_blank"} href='/privacy.html'>cookie policy</a>
         </div>
         <div>
            <h4>Our social</h4>
            <div>
              <SocialIcon style={{margin:"3px" , height:"30px" , width:"30px"}} bgColor='blue' fgColor='white' url='https://facebook.com/chulofooddelivery'/>
              <SocialIcon style={{margin:"3px" , height:"30px" , width:"30px"}} bgColor='black' fgColor='white' url='https://tiktok.com/@chulofooddelivery'/>
              <SocialIcon style={{margin:"3px" , height:"30px" , width:"30px"}} bgColor='red' fgColor='white' url='https://www.youtube.com/@chulofooddelivery'/>
              {/* <SocialIcon url='https://instagram.com/chulofooddelivery'/> */}
              </div>
         </div>
      </div>
      <div className='first-div'>
        <div>
        <small>Cash on delivery.</small>
        <p>Food Delivery Services in Birendranagar Surkhet.</p>
        </div>
        <div>
        <img width={'auto'} height={"100px"} src='https://chulofood.com.np/static/media/nobg-logo.6f6542ca353823e0911d.png'/>
        </div>
      </div>
      <div style={{margin:'auto' , display:"flex" , justifyContent:"center"}}>@2023 Chulo Food Delivery</div>
    </footer>}
  
    </>
  )
}

export default Footer