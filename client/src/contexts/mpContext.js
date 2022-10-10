import axios from 'axios'
import React, {useContext, createContext } from 'react'

const MercadoPagoContext = createContext();

export const useMpContext = () => {
    return useContext(MercadoPagoContext)
}

export const MpProvider = ({ children }) => {

    // función que hace el request del access token de un usuario en MercadoPago 

    const mpAccessTokenRequest = async (code) => {
     
        let theCode = code;
        axios.post(`https://api.mercadopago.com/oauth/token?client_id=72333279858722&client_secret=By9fcjHOQFoTWmSLwfWGvGVkOGzw6dNX&grant_type=authorization_code&code=${theCode}&redirect_uri=https://theshopnet.netlify.app/successfullBinding`)
            .then(res => {
                axios.post('https://the-shopnet.herokuapp.com/api/users/postAccessToken', {
                    id: localStorage.getItem('id'),
                    access_token: res.data.access_token,
                    refresh_token: res.data.refresh_token
                })
                console.log(res.data)
            })
            .then(
                console.log('Enviadito :P ')
            )   
            .catch(e => {
                console.log('Hubo un error del tipo: ' + e)
            })
    }

    const value = {

        mpAccessTokenRequest
    }

    return (
        <MercadoPagoContext.Provider value={value} >
            {children}
        </MercadoPagoContext.Provider>
    )
}

