import React from 'react'
import '../Categories/Categories.css'
import Search from '../Search/Search'
import { GiClothes, GiHomeGarage, GiWhiteBook, GiGuitar } from 'react-icons/gi'
import { MdOutlineLaptopWindows } from 'react-icons/md'
import { FaFutbol }from 'react-icons/fa'


const Categories = () => {
return (
    <>
    <div className='categories_box'>
       <Search />
       <h1> Categorías <span> _ </span> </h1>
        <div className='categorias_options'>

            <div className='ropa-option option'>
                <GiClothes size={45} />
                <p>Ropa</p>
            </div>
            <div className='ropa-option option'>
                <GiHomeGarage size={45} />
                <p> Hogar</p>
            </div>
            <div className='ropa-option option'>
                <MdOutlineLaptopWindows size={45} />
                <p> Tecnología </p>
            </div>
            <div className='ropa-option option'>
                <FaFutbol size={45} />
                <p> Deportes</p>
            </div>
            
            <div className='ropa-option option'>
                <GiWhiteBook size={45} />
                <p> Libros </p>
            </div>
            <div className='ropa-option option'>
                <GiGuitar size={45} />
                <p> Música </p>
            </div>
            <div className='ropa-option option'>
                <GiClothes size={45} />
                <p> Cosméticos </p>
            </div>
            <div className='ropa-option option'>
                <GiClothes size={45} />
                <p> Electrodomésticos </p>
            </div>
        </div>
    </div>
    </>
)
}

export default Categories;
