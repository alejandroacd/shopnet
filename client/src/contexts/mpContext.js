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
         axios.post(`https://api.mercadopago.com/oauth/token?client_id=72333279858722&client_secret=RQK2n18b4ngiLcibxQrM08ATGYfhipK1&grant_type=authorization_code&redirect_uri=http://localhost:3000/successfullBinding&code=${theCode}`)
            .then(res => {
                axios.post('http://localhost:3001/api/users/postAccessToken', {
                    id: localStorage.getItem('id'),
                    access_token: res.data.access_token,
                    refresh_token: res.data.refresh_token
                })
            })
            .then(
                console.log('Enviadito :P ')
            )
            .catch(e => {
                console.log(e)
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

