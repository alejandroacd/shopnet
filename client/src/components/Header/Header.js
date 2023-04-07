import React,{useEffect, useState} from 'react'
import "../Header/Header.css"
import { Link } from 'react-router-dom';
import { MdFavoriteBorder } from 'react-icons/md'
import { useCart } from '../../contexts/CartContext'
import Search from '../../components/Search/Search'

const Header = () => {

    const {favorites} = useCart()
    const token = localStorage.getItem('token')
    const [isLoggedIn,setLoggedIn] = useState(false);
    const identifier = localStorage.getItem('id') || null;
    
    useEffect(() => {
        if(token){
            setLoggedIn(true)
        }
    }, [isLoggedIn])
  
    const redirection = () => {
        return window.location = "/"
    }
 
    
    return (
        <div className='container_header'>
        <header className="header">
            <div className="logo" onClick={redirection}>
                <h1>SHOPNET<span className='underscore'>_</span></h1>
            </div>
   

            <div className='browse_options'>
            <ul className='nav-list'>
                <Link to={isLoggedIn ? `/me/${identifier}` : "login"}> <li> {isLoggedIn ? 'mi perfil' : "iniciar sesión"} </li> </Link>
                <Link to={isLoggedIn ? '/postProduct' : '/login'}> <li> vender </li> </Link>
                <Link to="/search"> <li>  categorías </li> </Link>
            </ul>
            <Link to={`me/${localStorage.getItem('id')}/favorites`}> <li>  {favorites ? favorites.length : null} <MdFavoriteBorder size={25} /></li> </Link>

            </div>
    
        </header>

        
        </div>
    )
}

export default Header