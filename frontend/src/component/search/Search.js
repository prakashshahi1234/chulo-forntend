import React , {useEffect} from 'react';
import "./search.css";
import {useParams , useNavigate , useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {SearchItem} from '../../redux/actions/productAction'
import Loading from '../loading/Loading';
import {useAlert} from 'react-alert'
import Card from '../productCard/Card';
import { Helmet } from 'react-helmet';
import { Button } from '@mui/material';
function Search() {

    let {name } = useParams();
    const {state} = useLocation()
     
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    const {searchedItem , loading , error, product , category} = useSelector(state=>state.productReducer)
    const alert = useAlert()
     
    useEffect(()=>{

    if(error){
        alert.show(error)
    }
    },[searchedItem , error])
    
    useEffect(()=>{

      const categoryId  = name.match((/^[0-9]+$/))


    !categoryId && !searchedItem &&  name && dispatch(SearchItem(name ,"search"))  
     

     !searchedItem &&  name.match(/^[0-9]/) && dispatch(SearchItem(categoryId,"category"))


    },[name])
 
    


  return (


       <div>
         <Helmet>
 <title>{state?.title || name}</title>

          </Helmet>

        {loading?<Loading/>:<div className='cart-container'>
            {/* <p>{ searchedItem && JSON.stringify(searchedItem)}</p> */}
              {
                 searchedItem && searchedItem?.map((item , key)=>{

                    return <Card 
                     key={key}
                     productId={item?.id}
                     src={item.imagesrc? item.imagesrc[0].src : " "}
                     type={item.imagesrc?item.imagesrc[0].type : ' '} 
                     title={item?.name}
                     price={item?.price}
                     size={item?.size}
                    />

                   
                })
              }
             
        </div>}
        <div className="category-list">
        <h3>Choose Category</h3>
        <div>
      { category && category?.map((item, key)=>{
          return <Button key={key+"34"} className="button-cat" onClick={()=>{
            return(dispatch(SearchItem(item?.id, "category")),
            navigate(`/search/${item.id}` ,{state:{title:item.name}} ))}}
             >{item.name}</Button>
        })}
        </div>
      </div>
    </div>

  )
}

export default Search