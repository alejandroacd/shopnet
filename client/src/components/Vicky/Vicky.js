import React, { useState } from 'react';
import '../Vicky/Vicky.css'


const Vicky = () => {

    const [interruptor, setInterruptor] = useState(false)

    const moverInterruptor = () => {
        setInterruptor(!interruptor)
    }

    return (
        <>
        <div class='box_vicky'>
           <h1>
            Soy Vicky <span>_</span>
           </h1>
           <p>Soy la más linda de todo el mundo</p>
           <button onClick={moverInterruptor}> Por qué? </button>

           <p className={interruptor ? 'd-flex respuesta' : 'd-none'}> Porque para Ale es lo más lindo del mundo, y ya jejeje 
           <br/>
           Si la querés seguir en instagram: 
           

           <a href='http://instagram.com/victorianarvay'><br/><br/>Vicky Narvay </a>
            </p>





        </div>
        
        </>
    )
}

export default Vicky;