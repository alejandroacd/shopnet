import React,{useEffect, useState} from 'react'
import "../Header/Header.css"
import { BiMenu } from 'react-icons/bi'
import { Link } from 'react-router-dom';



const Header = () => {

    const [toggle,setToggle] = useState(false);
    const [isLoggedIn,setLoggedIn] = useState(false);
    const identifier = localStorage.getItem('id') || null;

    


    useEffect(() => {
        if(localStorage.getItem('token')){
            setLoggedIn(!isLoggedIn)
        }
    }, [])
  
    const redirection = () => {
        return window.location = "/"
    }
    const switchToggle = () => {
        setToggle(!toggle)
    }

    

    return (
        <div className='container_header'>
        <header className="header">
            <div className="logo" onClick={redirection}>
                <h1>SHOPNET<span className='underscore'>_</span></h1>
            </div>
            <ul className='nav-list'>
                <Link to={isLoggedIn ? `/me/${identifier}` : "login"}> <li> {isLoggedIn ? 'Ver mi perfil' : "Iniciar Sesión"} </li> </Link>
                <Link to="signup"> <li> Vender </li> </Link>
                <Link to="signup"> <li> Ver categorías </li> </Link>
                <Link to="signup"> <li> FAQ </li> </Link>
            </ul>

           
            <BiMenu className='burger-menu' onClick={switchToggle} size={25} />
        </header>

        <ul className={toggle ? 'nav-list-burger d-flex' : '.nav-list-burger d-none'}>
                <Link to={isLoggedIn ? `/me/${identifier}` : "login"} onClick={switchToggle}> <li> {isLoggedIn ? 'Ver mi perfil' : "Iniciar Sesión"}  </li> </Link>
                <Link to="signup" onClick={switchToggle}> <li> Vender </li> </Link>
                <Link to="signup" onClick={switchToggle}> <li> Ver categorías </li> </Link>
                <Link to="signup" onClick={switchToggle}> <li> FAQ </li> </Link>
            </ul>
        </div>
    )
}

export default Header