import React from 'react'
import '../FAQ/Faq.css'

const Faq = () => {


    return (

        <div className='faq_container'>
            <h1> FAQ <span> _ </span></h1>

            <div className='faq_box'>
                <p className='question'> <span className='blue'>¿</span>
                      Qué es Shopnet
                 <span className='blue'>?</span> </p>
                <p className='answer'> Shopnet es una plataforma de tipo marketplace donde podés postear algún producto que quieras vender, o buscar alguno que quieras</p>

            </div>

            <div className='faq_box'>
                <p className='question'> <span className='blue'>¿</span>
                      Qué tengo que hacer para comprar / vender
                 <span className='blue'>?</span> </p>
                <p className='answer'> Registrarse. Para comprar, apretar el botón comprar sobre el producto que desees, y luego, se te pondrá a disposición la información de contacto de la persona vendedora. Para vender, en móvil apretar el simbolo "+" y llenar el formulario de venta, con fotos y descripción. </p>

            </div>

            
        </div>
    )   
}

export default Faq