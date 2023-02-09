import React,{useState,useEffect,useRef} from "react";
import "./card.css";
import { Link ,useNavigate } from "react-router-dom";

function Card({src,type ,title,price , productId , colorId , sizeId , size }){
     const [width,setwidth] = useState("");
     const cardRef = useRef("");
     const offsetTop = cardRef.current.offsetTop;
     const navigate = useNavigate();
     const widthOfwindow = window.innerWidth;
    
    useEffect(()=>{
     let available = parseInt(widthOfwindow) -(15*5)
     if(widthOfwindow>700){
        setwidth(available/5.5);

     }else if( widthOfwindow>4500){
         setwidth("40%")
     }else{
        setwidth("45%")

     }
    },[offsetTop])

  
    
    return(
        <Link className="product-card cardLink"  style={{width:width}} ref={cardRef}   to={`/product-detail/${productId}/${title}`}>
        <div  onClick={()=>{navigate(`/product-detail/${productId}/${title}`)}}>
            {type==="image" &&<img src={src} alt={title} width={  widthOfwindow<700 ? "100%" :width}/>}
            {type==="video" &&<video src={src} alt={title} width={width} autoPlay="true" muted/>}
            <p>{title}</p>
            <span>RS.{" " +price}/<small> {size}</small></span>
        </div>
        </Link>
    )
}
export default Card;

  
