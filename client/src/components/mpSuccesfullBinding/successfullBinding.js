import React, { useEffect } from 'react';
import '../mpSuccesfullBinding/successfullBinding.css'
import { useMpContext } from '../../contexts/mpContext';

const SuccessfullBinding = () => {

    const id = localStorage.getItem('id')
    const { mpAccessTokenRequest } = useMpContext()
    
    useEffect(() => {
        const query = window.location.search
        const queryDecoded = new URLSearchParams(query)
        const finalCode = queryDecoded.get('code')
        console.log(finalCode)
         mpAccessTokenRequest(finalCode)


        /* .then(() => {
            setTimeout(() => {
                window.location = `/me/${id}`
            },5000)
         })*/


    },[mpAccessTokenRequest])
    
    return (
     <div className='box'>
        <p>Sincronizando con MercadoPago :)</p>
      <div class="load-3">
         
         
         <div class="line"></div>
         <div class="line"></div>
         <div class="line"></div>    

       </div>


        </div>
    )
}

export default SuccessfullBinding;