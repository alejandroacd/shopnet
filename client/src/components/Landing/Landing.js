import React from 'react'
import { Link } from 'react-router-dom'
import '../Landing/Landing.css'

const Landing = () => {
    return (
        <div className='landing'>
           
             <p className='landing_title'>
               Comprá y vendé lo que quieras. Al precio que quieras!
             </p>
             <div className='buttons'>
                 <Link to="dashboard" className='landing_button'>Últimos post</Link> 
                 <Link to="search" className='landing_button'> Buscar por categoría</Link>
             </div>
             
        </div>
    )   
}

export default Landing