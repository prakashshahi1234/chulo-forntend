import React ,{useState , useEffect , useRef} from 'react';
import "./productdetail.css";
import axios from "axios";
import {useNavigate, useParams}  from "react-router-dom";
import {useSelector , useDispatch}  from 'react-redux';
import {loadProductDetail, addToCart, deleteALLCart} from '../../redux/actions/productAction'
import {useAlert}  from 'react-alert';
import Loading from '../loading/Loading';
import ReactImageMagnify from 'react-image-magnify';
import {Helmet} from 'react-helmet'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


function ProductDetail() {
    
    const [index, setindex] = useState(0)

    let {productData, loading} = useSelector(state=> state.productReducer);

    const {isAuthenticated} = useSelector(state=> state.userReducer);

    const alert = useAlert();

    const inputRef = useRef("")

    const actionRef = useRef("")

    const navigate = useNavigate();

    //   to add quantity properties in data 
    if(productData){

        productData.subData = productData && productData?.subData.map(item=>{

            return( {...item,quantity:1})

        })

    }

    const [data , setdata] = useState([]);
    useEffect(()=>{

        productData && setdata(productData.subData)

    },[productData])

   


    // to set value after quantity input element is active
   const activeElement = document.activeElement;
    useEffect(()=>{
        
        if(activeElement  && activeElement.type==='number'){

           activeElement.addEventListener("blur",()=>{     

               if(parseInt(activeElement.value)<=0||parseInt( activeElement.value)>activeElement.max || activeElement.value===""|| activeElement.value===" " || !Number?.isIntegernte(activeElement.value)){
                   
                activeElement.value ="1"
                  
                alert.show(<div style={{textTransform:"capitalize"}}>Invalid Quantity. It sholuld be in between {activeElement.min} to {activeElement.max}</div> , {timeout:5000})
              
            }

            })

          }

    },[activeElement])
  
  
    
  
    // quantity 
   const quntityHandler = (e, index,available) =>{    
     if(parseInt(e.target.value)<1|| e.target.value===""  ||  parseInt(e.target.value) > parseInt(available)){
        setdata(state=>data.map((item, key)=>{
            if(index===key){
                return item;
            }else{
                return item;
            }
           }));
      }else{
        setdata(state=>data.map((item, key)=>{
            if(index===key){
                item.quantity =parseInt( e.target.value);
                return item;
            }else{
                return item;
            }
           }));
     }
   }

   const quntityHandlerForIcons = (value, index,available ,type) =>{    
     if( parseInt(value) > parseInt(available)){
        setdata(state=>data.map((item, key)=>{
            if(index===key){
                return item;
            }else{
                return item;
            }
           }));
      }else{
        setdata(state=>data.map((item, key)=>{
            if(index===key && type==="add" && available>value+1){
                item.quantity = parseInt(item.quantity) + 1;
                return item;
            }else if((index===key && type==="subtract" && item.quantity>1 )){
            item.quantity =parseInt(item.quantity)-1;
              return item;
            }
            else if(index===key && type==="focus" ){

                return item;

            }else{
              return item;
            }
           }));
     }
   }


    // to make array of images
    var imgArr  =productData && productData?.subData?.map((item, index)=>{return item.imagesrc});
     
    let [x, setx] = useState([])
    useEffect(()=>{
   
     setx([])
     imgArr &&  imgArr.map(item=>{
        
        item.map((item)=>{
               
            setx(state=>[...state , item])

           })           
       })
     

    },[productData])
     
    // get data from the url
    const {productId ,title}  =  useParams();

    const dispatch = useDispatch();
    
//    dispatch product details 
    useEffect(() => {    
       
      dispatch(loadProductDetail(productId))

    }, [productId, dispatch ])


//  selected item from all
 const [selectedItem , setSelectedItem] = useState([]);
 
//  push by clicked in check box
 const pushToSelected =(e) =>{
    
    const value =  parseInt(e.target.value);
      console.log(value)
    if(selectedItem.includes(value)===true){

        setSelectedItem(selectedItem.filter((item , index, self)=>item!==value));

    }else{

        setSelectedItem(state=>[...state, value]);

    }
 }
 

//  for total price in the dispaly
 const [totalPrice , settotalPrice] = useState(0);

 const [forAdd, setForAdd] = useState([]);

 useEffect(()=>{

 const filterArray =  data.filter((item, index , self)=>{

       return selectedItem.includes(index)
 })

 setForAdd(filterArray?.map(item=>{


     return ({colorId:item.id , quantity:item.quantity, sizeId:item.sizeId , productId:item?.productId})

    }))


 filterArray?.length >=1 && settotalPrice(filterArray.reduce((a, c)=> {return a+parseInt(c.price*parseInt(c.quantity))},0))

 if(filterArray?.length===0 || !filterArray){

     settotalPrice(0)

 }

 },[selectedItem , loading , data])




//  add to cart 
const addToCartItem = ()=>{

if(isAuthenticated){

    if(selectedItem.length===0 ){

        actionRef.current.style.border="4px solid yellow"
        actionRef.current.style.transition="0.7s all"
        alert.error(<div style={{ textTransform:"capitalize" }}>Select at least one item. To select item click on checkbox. Then click add to cart Button</div> , {timeout:10000})
        
    }else{

        dispatch(addToCart(forAdd))

        alert.success("added .")
    }

   setSelectedItem([])

}else{

    navigate("/login")

}

}

  const buyItem = async() =>{
    if(isAuthenticated){

        if(selectedItem.length===0 ){
    
            actionRef.current.style.border="4px solid yellow"
            actionRef.current.style.transition="0.7s all"
            alert.error(<div style={{ textTransform:"capitalize" }}>Select at least one item.To select item click on checkbox. Then click add to Buy Button</div> , {timeout:10000})
            
        }else{

            const {data}  = await axios.get(`/api/v1/delete-all-cart`);

            data.success===true &&  dispatch(addToCart(forAdd))

             data.success===true &&  navigate("/checkout")


                  
        }
    
       setSelectedItem([])
    
    }else{
    
        navigate("/login")
    
    }

   }

 useEffect(()=>{
   
 },[data])
   

     return (
         <>
         <Helmet>
         <title>{title}</title>
         
         </Helmet>
   
        {loading?<Loading/>:<div className='product-detail'>
              <div className='images'>
                 <div className="menu-images" >
                     {x && x?.map((item,index)=>
                     { return (
                          item.type==="video" &&  
                          <video 
                                key={index}
                                onMouseOver={()=>setindex(index)}
                                alt={title} 
                                src={item.src}
                                width="30px" 
                                autoplay="true"
                                 muted
                                 />
                              )}
                      )}
                     {x && x?.map((item,index)=>
                     { return (
                           item.type==="image" && 
                         <img
                              key={index}
                              onMouseOver={()=>setindex(index)}
                              alt={title}
                              src={item.src} 
                              width="30px"
                             />
                           )}
                      )}
                 </div>
                 <div className='full-image'>
                    {x && x[index]?.type==="image"  && 
                           <ReactImageMagnify 
                           
                            {...{
                                smallImage: {
                                  alt: "",
                                  isFluidWidth: true,
                                  src: `${x[index].src}`,                                  sizes:
                                    "(min-width: 800px) 37.5vw, (min-width: 415px) 50vw, 100vw"
                                  
                                  
                                  },
                                    
                                  
                                largeImage: {
                                  alt: productData?.product?.name,
                                  src: `${x[index].src}`,
                                  width: 1200,
                                  height: 1800
                                },
                              
                              shouldUsePositiveSpaceLens: true,
                                isHintEnabled: true,
                                lensStyle:{height:"20px" ,width:"40px" }
                           
                              }
                            }
                            
                         />
                         
                           }
                    {x   && x[index]?.type==="video" && 
                      <video
                           src={ x && x[index]?.src}
                           width={'300px'} 
                           alt={title} 
                           height={"auto"}
                           autoPlay="true"
                           controls muted
                        />}
                 </div>
                
              </div>

              <div className='product-description'> 
                      <h2>{productData?.product?.name}</h2>
                         <div className="price-rating">
                             {/* <p><BasicRating
                             /></p> */}
                         </div>
                         <hr className='hr-line'/>
                          <ul className='item-control'>
                            <table className='table-for-product' >
                          <thead>
                              <tr  className='table-row-for-product-detail'>
                                  <th>Select</th>
                                  {/* <th>S. N.</th> */}
                                  <th>Sizes</th>
                                  {/* <th>Color</th> */}
                                  <th>Quantity</th>
                                  <th>Rate/Item</th>
                              </tr>
                          </thead>
                           <tbody>                         
                                   {  data.map((item, key)=>{
                                           return (
                                              <tr key={key}  className={`table-row-for-product-detail  + ${item.available<=1 && 'out-of-stock' } `} >
                                                  <td ref={actionRef}>
                                                
                                                 { data.length!==1 ? (  selectedItem.includes(key) ?
                                                     <input
                                                      key={key}  
                                                      type="checkbox" 
                                                      onChange={pushToSelected}
                                                       value={key} checked
                                                       />:
                                                    <input  
                                                      key={key+1}
                                                      type="checkbox"                                                      
                                                      onChange={pushToSelected}
                                                      value={key} 
                                                      />):
                                                     <>'</>
                                                    
                                                }
                                               
                                                 </td>
                                                     <td style={{width:"fit-content"}}>{item?.size}</td>                                                    
                                                 
                                                     <td style={{display:"flex"  ,alignItems:"center"}}>
                                                     <RemoveIcon onClick={()=>{quntityHandlerForIcons(item?.quantity, key , item?.available ,"subtract")}}/>

                                                       <input 
                                                       style={{padding:"3px", 'textAlign':"center" , border:"1px solid lightgray" , width:"fit-content"}}
                                                        ref={inputRef}  type='number' pattern="[0-9]"  
                                                       value={item?.quantity}
                                                       onChange={(e)=>{ return quntityHandler(e, key, item?.available)}}
                                                        max={item?.available} 
                                                        min={1}
                                                        onFocus={()=>quntityHandlerForIcons(0, key , item?.available ,"focus")}
                                                        placeholder={"Enter Quantity You Want."}
                                                        />
                                                      <AddIcon onClick={()=>{quntityHandlerForIcons(item?.quantity, key , item?.available ,"add")}}/>

                                                      </td>
                                                      <td><b>Rs {item?.price}</b></td>
              
                                                     </tr>
                                                  )             
                                       })
                                   }          
                                        
                           </tbody>          
                           </table>                              
                            
                          </ul>
                          <div className='total-price-div'>
                           <i><b> Total Price : Rs  {totalPrice}</b></i> 
                         </div>
                          <div className='shop-btn'>
                            <button
                             onClick={addToCartItem}
                             style={{background:forAdd.length>=1 && "yellow" , transition:"2s all"}}
                            >Add to Cart</button>
                            <button onClick={buyItem}>Buy</button>
                          </div>
                          <hr className='hr-line'/>

                          <ul className='detail-desc'>

                            <div dangerouslySetInnerHTML={{__html: productData?.product?.description}}></div>                         

                             </ul>
                      
                          
                         
              </div>
              
        </div>}
        </>
    )
}

export default ProductDetail;
