import React,{ useEffect } from 'react';
import axios from 'axios'
import { useCart } from '../../contexts/CartContext'
import ProductCard from '../ProductCard/ProductCard'
import './Favorites.css'
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {

    const { favorites } = useCart()
    const navigate = useNavigate()


    return (
        <>

        <div className='favorites_box'>
            <BiArrowBack style={{color: 'var(--primary)', margin: '1em'}} onClick={() => navigate(-1)} />
            <h1> {favorites.length > 0 ? "Favoritos"  : 'No tienes favoritos :('} </h1>
        {favorites.map(x => {
            return (
                <ProductCard key={x.url} productName={x.productName} price={x.price} image1={x.image1} url={x.url} />
            )
        })}
        </div>
        </>
    )
}

export default Favorites