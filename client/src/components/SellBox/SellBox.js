import React, { useEffect, useState } from 'react'
import './SellBox.css'
import axios from 'axios';
import './Slider.js'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'
import Slider from './Slider.js';
import { useCart } from '../../contexts/CartContext'


const SellBox = () => {

    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const queryString = window.location.search
    const decoded = new URLSearchParams(queryString)
    const value = decoded.get('id')
    const { addToFavorites } = useCart()
    const [images, setImages] = useState({
        image1: product.image1,
        image2: product.image2,
        image3: product.image3,
        image4: product.image4,
        image5: product.image5,
        image6: product.image6
    })


    useEffect(() => {


        console.log(product)
        axios.get(`https://shopnet.up.railway.app/api/products/${value}`)
            .then(res => {
                console.log(res.data)
                setLoading(false)
                setProduct(res.data)
                setImages({
                    image1: res.data.image1,
                    image2: res.data.image2,
                    image3: res.data.image3,
                    image4: res.data.image4,
                    image5: res.data.image5,
                    image6: res.data.image6
                })
            })

            .catch(err => console.log(err))
    }, [])




    return (

        <>

            {loading ? <div className='loading-block'> <div className="lds-dual-ring"></div> </div> :
             <>
            <div className='go_back_button' onClick={() => navigate(-1)}>
                    <BiArrowBack className='arrow_icon' size={25} />
                    Ir atrás
             </div>
            <h1 className='product-title'> {product.productName}</h1> 
            <div className='sellbox_div'>
           
                <Slider slides={images} />
                <div className='product-info'>
                    <h1> Descripción: </h1>
                    <p> {product.description} </p>
                    <h1> Categoría: </h1>
                    <p> {product.categorie} </p>
                    <h1> Precio: </h1>
                    <p className='product_price'> <b>{product.price}</b>  <span>$</span> </p>

                    <h1 className='paymentMethods'>Métodos de pago <span> __ </span>: </h1>
                    <p> <b>Efectivo en la entrega: </b> {product.acceptCash ? 'Sí' : 'No'}</p>
                    <p> <b>Mercadopago o transferencia: </b> {product.acceptMercadoPago ? 'Sí' : 'No'} </p>
                    <h1> Publicado por <span>_ </span>:</h1>
                    <div className='userInfo_div'>
                        <img src={product.photoOfSeller} className='photo_seller' alt="Foto del vendedor" />
                        <p> {product.nameOfSeller} </p>
                    </div>
                    <div className='product-buttons'>
                        <button> Enviar un mensaje al vendedor <AiOutlineWhatsApp /> </button>
                        <button onClick={() => addToFavorites(product)}> Agregar a Favoritos  <BsFillSuitHeartFill /> </button>
                    </div>

                </div>
            </div>
            </>
}
</>
            
       
    )
}

export default SellBox