import React,{useState, useEffect, useRef} from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import AddToHomeScreen from '@ideasio/add-to-homescreen-react';
import {   AppRegistration, Close, LoginOutlined, SearchOutlined } from '@mui/icons-material';
import { Link ,useNavigate , useLocation} from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Avatar from '@mui/material/Avatar';
import SubNav from "./SubNav";
import CloseIcon from '@mui/icons-material/Close';
import "./nav.css";
import {useSelector, useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import {loadCartItemDetail , deleteCartItem} from "../../redux/actions/productAction"
import Loading from '../loading/Loading';
import { ListItem ,ListItemText , ListItemIcon } from '@mui/material';
import {SearchItem} from '../../redux/actions/productAction' 
import logo from './image/logo.jpg'
import noBgLogo from './image/nobg-logo.png'

function Nav() {

   const [searchText, setsearchText] = useState("");

   const navigate = useNavigate();

   const {pathname} = useLocation()
    
   const {isAuthenticated , user} = useSelector(state => state.userReducer);

   const {cartItem , error , loading , cartItemDetails , category} = useSelector(state => state.productReducer);
  
   const alert = useAlert();

   const dispatch = useDispatch();

   const [toggle , settoggle] = useState(false)

   const searchRef = useRef("");

  const searchItem = async(e) =>{

           e.preventDefault()

          if(searchText.length!==0){

            dispatch(SearchItem(searchText.replace("/" , " ") ,"search"))

            navigate("/search/"+searchText.replace("/" ,  " ") )
       
           }else{
             alert.show(<div style={{textTransform:"lowercase"}}>Enter Name or category of product.</div>)
           }
    }


    useEffect(()=>{
   
     cartItem?.length>=1 && dispatch(loadCartItemDetail(cartItem))

    },[cartItem ,toggle])

    const url = window.location.href;
   
    const [state, setState] = React.useState({

        top: false,

        left: false,

        bottom: false,

        right: false,

      });
    
      const toggleDrawer = (anchor, open) => (event) => {

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {

          return;

        }
    
        setState({ ...state, [anchor]: open });

      };
      
      const  compare =  ( a, b ) => {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }
      // sidebar left for menu
      const leftList = (anchor) => (
           <Box>
           <ListItem >
                  <ListItemIcon className='middle-nav left-nav'>
                  <form  onSubmit={(e)=>{return(setState(state=>{return ({...state, left:false} )}),searchItem(e))}}>
                    <input id='searchfied'  ref={searchRef} type="search" placeholder='Search here' onChange={(e)=>setsearchText(e.target.value.toLowerCase())}/>
                    <SearchOutlined onClick={(e)=>{ return( setState(state=>{return ({...state, left:false} )}),searchItem(e))}} className="searchIcon"/>
                  </form>
                  </ListItemIcon>
            </ListItem>
             <Box
               sx={{ width:"300px"  , margin:"auto"}}
               role="presentation"
               onClick={toggleDrawer(anchor, false)}
               onKeyDown={toggleDrawer(anchor, false)}
             >
            <List>
         
             {isAuthenticated && <ListItem sx={{cursor:"pointer"}} onClick={()=>{navigate("/user-profile")}}>
                  <ListItemIcon >
                     <Avatar alt={user?.name} />
                  </ListItemIcon>
                 <ListItemText primary={"profile"} />
            </ListItem>}
           { !isAuthenticated && <>
            <ListItem onClick={()=>{navigate("/login")}}>
                  <ListItemIcon>
                     <LoginOutlined />
                  </ListItemIcon>
                 <ListItemText primary={"Login"} />
            </ListItem>
              <ListItem onClick={()=>{navigate("/register")}}>
                  <ListItemIcon>
                     <AppRegistration/>
                  </ListItemIcon>
                 <ListItemText primary={"Register"} />
            </ListItem>  </>
            }  
           
            {/* <p style={{textAlign:"start" , padding:'10px'}}>Category</p>     */}
            <Divider />        

            <p style={{padding:"10px", paddingLeft:"20px" ,background:"var(--title-bg-color)" ,fontSize:"18px" , }}>Category</p>  
            <div  style={{display:"flex", flexDirection:"column",  alignItems:"flex-start" , paddingLeft:"30px"}}>  
             {category && category.sort(compare).map((item , key)=>{
                   return (

                   <Button sx={{color:'var(--bg-color)' , textAlign:"start" }}  onClick={()=>{getproductByCategory(item.id)}} key={key}>{item.name}</Button>           

             )
                 })}
                </div>  
           </List>
          <Divider />          
             </Box>
           </Box>
      );
      
      // total price for the check out
      const totalPrice = cartItemDetails && cartItemDetails.reduce((a, c)=>{return a+(c.quantity * c.price) },0) 
     
      // check out
      const checkout =(anchor) =>{
      
      if(cartItem.length>=1){

        setState({ ...state, "right": false });

       window.location.href ="/checkout"

      }else{

        setState({ ...state, "right": false });

       alert.show("Your Cart is empty.", {timeout:5000})
       
      }
        
      }

      // cartitem for checkout
      const rightList = (anchor) => (

          <Box
          className='right-drawer-for-cart-item'
          role="presentation"
          onKeyDown={toggleDrawer(anchor, false)}
         >
          
            <div className="cart-item">
                 <div className='top-div'>
                     <h3>Cart</h3>
                      <CloseIcon onClick={toggleDrawer(anchor, false)}/>
                 </div>
                 <div className='checkout-div'>
                <h4> Grand Total : Rs {totalPrice || 0}</h4> 
                <Button 
                   sx={{background:"green"}}
                   variant="contained" color='secondary' 
                   onClick={checkout}>
                     Checkout
                </Button>
                 </div>
                 <Divider/>                
                 {
                  cartItemDetails &&  cartItemDetails.map((item , key)=>{
                      
                     return (
                           <>
                            { loading===true ?<Loading/>: <div key={key} className='bottom-div'>
                            {item.imagesrc[0].type==="image" && <img src={ item.imagesrc[0].src} />}
                            {item.imagesrc[0].type==="video" && <video src ={ item.imagesrc[0].src} height={""} width={"100px"} autoPlay="true" muted/>}
                             <div className='cart-item-details'>
                                 <p   onClick={()=>{return( setState(state=>({...state, right:false})),navigate(`product-detail/${item.productId}/${item.name}`))}}>{item?.name}</p>
                                 <p>{item?.size}/{item?.color}</p>                        
                                 <p>Rs {item?.price * item?.quantity}</p>                          
                                 <div className='item-controller'>
                                     <div className='item-quantity'>
                                       <p>  {"Q : " + item?.quantity} </p> 
                                       
                                     </div>
                                     <Button sx={{background:"red" , color:"white"}} onClick={()=>{return(dispatch(deleteCartItem(item?.id)),settoggle(state=>!state),cartItemDetails.length===1 && window.location.reload() ,alert.success("Item removed."))}}>Remove</Button>
                                 </div>
                             </div>                    
                            </div>}
                          </>
                     )
                   })
                  }
            </div>
          
          </Box>
      );
      useEffect(()=>{
        if(cartItem?.length===1 && pathname.includes("product-detail") ) {
          setState(state=>({...state , right:true}))
        }
      },[cartItem])

      const getproductByCategory =(categoryId)=>{
        dispatch(SearchItem(categoryId,"category"))
        navigate("/search/"+categoryId)
      }

 
    return (
      <>
      <div  style={{position:"sticky" ,top:"0px" ,padding:"3px 3px 0px 3px",zIndex:100 , background:"var(--bg-color)"}}>
        <nav className='nav'>
            <div className='left-nav'>
                    <div>
                 {   ['left'].map((anchor ) => (
                     <React.Fragment key={anchor}>
                       <Button onClick={toggleDrawer(anchor, true)}><MenuIcon style={{color:"white"}}/></Button>
                       <Drawer
                         anchor={anchor}
                         open={state[anchor]}
                         onClose={toggleDrawer(anchor, false)}
                       >
                         {leftList(anchor)}
                       </Drawer>
                     </React.Fragment>
                      ))}

                    </div>
                      <img alt="logo image" src={noBgLogo} onClick={()=>{navigate("/")}} className={"logo"}/>
                     {   ['right'].map((anchor) => (
                     <React.Fragment key={anchor}>
                       <button   style={{color:"white", padding:"6px", borderRadius:"4px"}} className='cart-item-for-moblie'  onClick={toggleDrawer(anchor, true)}><AddShoppingCartIcon />
                       <span style={{background:"red", color:"white", height:"14px", width:"14px",  borderRadius:"50%" , display:"flex" , alignItems:"center" , justifyContent:"center" ,padding:"3px"}}>{cartItem?.length}</span>

                       </button>
                       <Drawer
                         anchor={anchor}
                         open={state[anchor]}
                         onClose={toggleDrawer(anchor, false)}
                         
                       >
                         {rightList(anchor)}

                       </Drawer>
                     </React.Fragment>
                      ))}
                      <Link to="/login" style={{borderRadius:"5px", textDecoration:"none" ,marginRight:"4px",background:"darkgreen", color:"yellow" , padding:"6px", fontSize:"14px", textTransform:"uppercase"}} className='link'>Log In</Link>
            </div>
            <div className='middle-nav'>
              <form onSubmit={searchItem}>
                <input id='searchfied' ref={searchRef} type="search" placeholder='Search here' onChange={(e)=>setsearchText(e.target.value.trim())}/>
                <SearchOutlined onClick={(e)=>{searchItem(e)}} className="searchIcon"/>
                </form>
            </div>
            <div className='right-nav'>
            <AddToHomeScreen />

                   {   ['right'].map((anchor) => (
                     <React.Fragment key={anchor}>
                       <Button onClick={toggleDrawer(anchor, true)} style={{color:"white", borderRadius:"10px"}}><AddShoppingCartIcon style={{color:"white" }}/>
                       <span style={{background:"red", color:"white", height:"15px", width:"15px",  borderRadius:"50%" , display:"flex" , alignItems:"center" , justifyContent:"center" ,padding:"3px"}}>{cartItem?.length}</span>
                       </Button>
                       <Drawer
                         anchor={anchor}
                         open={state[anchor]}
                         onClose={toggleDrawer(anchor, false)}
                         variant='persistent'
                       >
                         {rightList(anchor)}
                       </Drawer>
                     </React.Fragment>
                      ))}
                  {!isAuthenticated  && <Link className='link' to="/register">Register</Link>}
                  {!isAuthenticated  && <Link className='link' to="/login">Login</Link>}
                  { isAuthenticated && <Link to="/user-profile"><Avatar 
                   alt={user?.name}
                   sx={{ background: "white", color: "black" }}
                   style={{fontSize:15 , padding:"2px" , height:"30px" , width:"30px" , marginLeft:"10px" , marginRight:"13px"}}
                   size={10}

                  /></Link>}
            </div>
        </nav>
     
      {pathname==="/" && <SubNav/>}
      {pathname.split("/")[1]==='search' && <SubNav/>}

    </div>  
    </>
    )
}





export default Nav
