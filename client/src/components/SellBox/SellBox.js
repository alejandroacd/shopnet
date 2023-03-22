import React, {useEffect, useState} from 'react'
import './SellBox.css'
import axios from 'axios'

const SellBox = () => {

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const queryString = window.location.search
    const decoded = new URLSearchParams(queryString)
    const value = decoded.get('id')


    useEffect(() => {
        setLoading(true)
        axios.get(`https://shopnet.up.railway.app/api/products/${value}`)
        .then(res => {
            setLoading(false)
            setProduct(res.data)
        })
        .catch(err => console.log(err))
    },[product,value])

 

    return (
     <>

   
     <div className='sellbox_div'>
            <img src={product.image1} />
            <h1> {product.productName}<span>_</span> </h1>
            <p> {product.description} </p>
            <h1> Precio: </h1>
            <p> {product.price} <span>$</span> </p>

            <h1 className='paymentMethods'>Métodos de pago <span> __ </span>: </h1>
            <p> <b>Efectivo en la entrega: </b> {product.acceptCash ? 'Sí' : 'No'}</p>
            <p> <b>Mercadopago: </b> {product.acceptMercadoPago ? 'Sí' : 'No'} </p>
            <h1> Publicado por <span>_ </span>:</h1>
            <div className='user_div'>
            <img src={product.photoOfSeller} className='photo_seller' alt="Foto del vendedor" />
            <p> {product.nameOfSeller} </p>
             </div>
        </div> 
     </>


    )
}

export default SellBox