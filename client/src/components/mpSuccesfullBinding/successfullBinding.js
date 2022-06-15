import React, { useEffect } from 'react';
import '../mpSuccesfullBinding/successfullBinding.css'
import { useMpContext } from '../../contexts/mpContext';

const SuccessfullBinding = () => {

    const { accessTokenInfo, mpAccessTokenRequest } = useMpContext()
    
    useEffect(() => {
        const query = window.location.search
        const queryDecoded = new URLSearchParams(query)
        const finalCode = queryDecoded.get('code')

         mpAccessTokenRequest(finalCode)
    },[mpAccessTokenRequest])
    
    return (
        <div className='box'>

        </div>
    )
}

export default SuccessfullBinding