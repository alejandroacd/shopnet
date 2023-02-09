import React,{useEffect, useState} from 'react'
import "../Header/Header.css"

import { Link } from 'react-router-dom';



const Header = () => {

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
            <ul className='nav-list'>
                <Link to={isLoggedIn ? `/me/${identifier}` : "login"}> <li> {isLoggedIn ? 'Mi perfil' : "Iniciar Sesión"} </li> </Link>
                <Link to={isLoggedIn ? '/postProduct' : '/login'}> <li> Vender </li> </Link>
                <Link to="/search"> <li> Ver categorías </li> </Link>
                <Link to="faq"> <li> FAQ </li> </Link>
            </ul>
        </header>

        
        </div>
    )
}

export default Header