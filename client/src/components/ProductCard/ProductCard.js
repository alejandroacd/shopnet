import React from 'react';
import '../ProductCard/ProductCard.css'


const ProductCard = (props) => {
    return (
        <div className='product-card'>
        <div className='image-and-author'>
        <img src={props.image} className='product_image'/>
        
        </div>
        <div className='description'>
            <div className='product-description'> 
            <h1> Hola </h1>                
           </div>
            <h2 className='price'>{props.price} $</h2>

            <div className='buttons-description'>
                <button> Añadir al carrito</button>

                <button>See more...</button>

            </div>
        </div>

        
    </div>
    )

}

export default ProductCard