import React from 'react'
import loadingSvg from "../user/images/loading.svg";


export const DeadButton=()=>{
    return(
        <button className='button' disabled><img height={"30px"} src={loadingSvg}/></button>
    )
}

