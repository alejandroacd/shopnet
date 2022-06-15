import React from 'react'
import '../Landing/Landing.css'

const Landing = () => {
    return (
        <div className='landing'>
           
             <p className='landing_title'>
               Comprá y vendé lo que quieras. Al precio que quieras!
             </p>
             <div className='buttons'>
                 <button className='landing_button'> Últimos posts</button>
                 <button className='landing_button'> Buscar por categoría </button>
             </div>
             
        </div>
    )
}

export default Landing