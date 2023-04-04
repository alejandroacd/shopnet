import React, { useEffect } from 'react';
import '../ProductCard/ProductCard.css'
import { Link } from 'react-router-dom'
import { MdFavoriteBorder } from 'react-icons/md'
import { useCart } from './../../contexts/CartContext'


const ProductCard = (props) => {

    const { addToFavorites, favorites } = useCart();
    let exist = favorites.find(x => x.url === props.url)


    return (
        <div className='product-card'>
        <div className='image-and-author'>
        <img src={props.image} className='product_image'/>
        
        </div>
        <div className='description'>
            <div className='product-description'> 
            <h1> {props.productName} </h1>                
           </div>
            <h2 className='price'>{props.price} $</h2>

            <div className='buttons-description'>
                <button className='button_description' style={exist ? {backgroundColor:'var(--secondary)'} : {}} onClick={() => addToFavorites(props)}> <MdFavoriteBorder style={exist ? {fill: 'var(--primary)'} : {}}/></button>

                <Link to={`product/?id=${props.url}`} > <button className='button_description'>  Ver más...</button></Link>

            </div>
        </div>


    </div>
    )

}

export default ProductCard