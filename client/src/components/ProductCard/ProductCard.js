import React from 'react';
import '../ProductCard/ProductCard.css'
import { Link } from 'react-router-dom'


const ProductCard = (props) => {

    return (
        <div className='product-card'>
        <div className='image-and-author'>
        <img src={props.image} className='product_image'/>
        
        </div>
        <div className='description'>
            <div className='product-description'> 
            <h1> {props.productName.slice(0, 25)}... </h1>                
           </div>
            <h2 className='price'>{props.price} $</h2>

            <div className='buttons-description'>
                <button className='button_description'> Añadir al carrito</button>

                <Link to={`product/?id=${props.url}`} > <button className='button_description'>  Ver más...</button></Link>

            </div>
        </div>


    </div>
    )

}

export default ProductCard