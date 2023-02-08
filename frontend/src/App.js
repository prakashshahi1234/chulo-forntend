import Nav from "./component/nav/Nav"
import { BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import React,{Suspense,useEffect } from "react";
import "./App.css"
import {useDispatch  , useSelector} from "react-redux";
import axios from "axios";
import  {getOrder, getUserAdress, getUserDetail , setLocation , getStatusOfApplication} from "./redux/actions/userAction";
import { loadCartItem, loadCategory} from "./redux/actions/productAction"
import  store from "./redux/store";
import cookie from "js-cookie";
import {useAlert} from "react-alert";
import Loading from "./component/loading/Loading";
import Checkout, { ChoosePaymentMethod } from "./component/CheckOut/Checkout";
import { REMOVE_ERROR_FOR_USER } from "./redux/constants/userConstant";
import { REMOVE_ERROR_FOR_PRODUCT } from "./redux/constants/productConstants";

const FillDetailAdress = React.lazy(()=>import( "./component/user/fill-detail/FillDetailAdress"));
const Home  = React.lazy(()=>import("./component/home/Home"));
const Login  = React.lazy(()=>import("./component/user/login/Login"));
const Register = React.lazy(()=>import("./component/user/registrattion/Register"))
const Verify = React.lazy(()=>import("./component/user/verify/Verify"));
const ForgetPassword = React.lazy(()=>import("./component/user/forget-pass/ForgetPass"));
const ProductDetail = React.lazy(()=>import("./component/productDetail/ProductDetail"));
const UserProfile = React.lazy(()=>import("./component/user/profile/Profile"))
const Search = React.lazy(()=>import("./component/search/Search"))

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated , error }  = useSelector(state=> state.userReducer);
  const {loading }  = useSelector(state=> state.productReducer);
  const  p = useSelector(state=> state.productReducer);
  const token = cookie.get("token")
  const alert = useAlert()
  // user session login
  useEffect(()=>{
   
     store.dispatch(getUserDetail());
     store.dispatch(loadCartItem());
     store.dispatch(getOrder());
     store.dispatch(loadCategory());
     store.dispatch(getUserAdress())
     store.dispatch(setLocation(alert))
     store.dispatch(getStatusOfApplication())
     
     navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      permissionStatus.onchange = () => {
        store.dispatch(setLocation(alert))
      };
    });

  },[])



  // to remove error after showing
  useEffect(() => {
    setTimeout(()=>{
     dispatch(removeError())
    },3000)
  }, [error ,p.error])

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // You can save the event in order to trigger the prompt later (see below)
      console.log(e)
    
    });
  }, [])

 const removeError =()=> async(dispatch) =>{
     return(dispatch({type:REMOVE_ERROR_FOR_USER})  ,
    dispatch({type:REMOVE_ERROR_FOR_PRODUCT})  )
  }

  
  return (
    <div className="App">
      <Router>
           <Nav/>
          <Suspense fallback={<Loading/>}>
          <Routes>
                 <Route path="/" element={<Home/>}/>
                 <Route path="/login" element={<Login/>}/>
                 <Route path="/register" element={<Register/>}/>                      
                 <Route index path="/set-up-details" element={<FillDetailAdress/>}/>
                 <Route path="/verify/:adress" element={<Verify/>}/>
                 <Route path="/forget-password/" element={<ForgetPassword/>}/> 
                 <Route path="/forget-password/" element={<ForgetPassword/>}/> 
                 <Route path="/product-detail/:productId/:title" element={<ProductDetail/>}/> 
                 <Route path="/user-profile" element={<UserProfile/>}/> 
                 <Route path="/checkout" element={<Checkout/>}>
                            <Route path="payment" element={<ChoosePaymentMethod/>}/>
                 </Route>
                 <Route path="/search/:name" element={<Search/>}/>        
                            
                 <Route path="*" element={<p>Page Not found</p>}/>  
          </Routes>
          </Suspense>
        </Router>
    </div>
  );
}

export default App;
