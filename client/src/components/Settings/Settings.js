import React, { useRef,useState } from 'react';
import '../Settings/Settings.css'
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import { succesfullAlert } from '../alerts';



const Settings = () => {

    let id = localStorage.getItem('id')
    let token = localStorage.getItem('token')
    let phoneNumberSaved = localStorage.getItem('phoneNumber')
    let neighborhoodSaved = localStorage.getItem('neighborhood')
    const neighborhood = useRef()
    const phoneNumber = useRef()
    const phoneRegEx = /^([0-9]){10}$/
    const [error,setError] = useState('')


    const sendSettings = async (e) => {
        e.preventDefault()
        const isValid = phoneRegEx.test(phoneNumber.current.value);
        console.log('eso')

        if(!isValid){
            setError('Debes introducir un número valido, de 10 dígitos. Incluyendo el código regional. Ejemplo: 1159873698')
        }
        else {
            axios.post('https://shopnet.up.railway.app/api/users/updateProfile', {
                identificador: localStorage.getItem('id'), 
                neighborhood: neighborhood.current.value,
                phoneNumber: phoneNumber.current.value
    
            })
                .then(
                    succesfullAlert('Perfil actualizado correctamente!'),
                    localStorage.setItem('phoneNumber',phoneNumber.current.value),
                    localStorage.setItem('neighborhood', neighborhood.current.value)
                )
                .then(
                    setTimeout(() => {
                        window.location = `/me/${id}`
                    }, 3000)
                )
                .catch(e => console.log(e))
        }
    }

    return (
        <>
            {!token && <Navigate replace to='/' />}

            <div className='settings_div'>
                <h1>Editá tu perfil</h1>{
                    error ? 
                    <p className='error'>{error}</p> 
                    : null
                }


                <form method='POST' action='https://shopnet.up.railway.app/api/users/updateProfile'>

                    <label htmlFor="neighborhood ">¿En qué barrio te encontrás? </label>
                    <select ref={neighborhood} name="neighborhood" id="neighborhood">
                        <option value={neighborhoodSaved} selected hidden disabled>{neighborhoodSaved} </option>
                        <option value="Almagro">Almagro</option>
                        <option value="Agronomía">Agronomía</option>
                        <option value="Balvanera"> Balvanera </option>
                        <option value="Barracas">Barracas</option>
                        <option value="Belgrano">Belgrano</option>
                        <option value="Boedo"> Boedo </option>
                        <option value="Caballito"> Caballito </option>
                        <option value="Chacarita"> Chacarita </option>
                        <option value="Colegiales"> Colegiales </option>
                        <option value="Constitución"> Constitución </option>
                        <option value="Flores"> Flores </option>
                        <option value="Floresta"> Floresta </option>
                        <option value="La Boca"> La Boca</option>
                        <option value="La Paternal"> La Paternal </option>
                        <option value="Liniers"> Liniers </option>
                        <option value="Mataderos"> Mataderos </option>
                        <option value="Monte Castro"> Monte Castro</option>
                        <option value="Montserrat"> Montserrat </option>
                        <option value="Nueva Pompeya"> Nueva Pompeya</option>
                        <option value="Núñez"> Núñez </option>
                        <option value="Palermo"> Palermo </option>
                        <option value="Parque Avellaneda"> Parque Avellaneda</option>
                        <option value="Parque Chacabuco"> Parque Chacabuco </option>
                        <option value="Parque Chas"> Parque Chas </option>
                        <option value="Parque Patricios"> Parque Patricios </option>
                        <option value="Puerto Madero"> Puerto Madero </option>
                        <option value="Recoleta"> Recoleta </option>
                        <option value="Retiro"> Retiro </option>
                        <option value="Saavedra"> Saavedra</option>
                        <option value="San Cristóbal"> San Cristóbal </option>
                        <option value="San Nicolás"> San Nicolás</option>
                        <option value="San Telmo"> San Telmo </option>
                        <option value="Versalles"> Versalles </option>
                        <option value="Villa Crespo"> Villa Crespo </option>
                        <option value="Villa Devoto"> Villa Devoto </option>
                        <option value="Villa General Mitre"> Villa General Mitre </option>
                        <option value="Villa Lugano"> Villa Lugano </option>
                        <option value="Villa Luro"> Villa Luro </option>
                        <option value="Villa Ortúzar"> Villa Ortúzar </option>
                        <option value="Villa Pueyrredón"> Villa Pueyrredón </option>
                        <option value="Villa Real"> Villa Real </option>
                        <option value="Villa Riachuelo"> Villa Riachuelo </option>
                        <option value="Villa Santa Rita"> Villa Santa Rita  </option>
                        <option value="Villa Soldati"> Villa Soldati </option>
                        <option value="Villa Urquiza"> Villa Urquiza </option>
                        <option value="Villa del Parque"> Villa del Parque </option>
                        <option value="Vélez Sarsfield"> Vélez Sarsfield  </option>
                    </select>
                    <label htmlFor="phoneNumber"> Número telefónico: </label>
                    <div className='number-input'>
                        <p> +54</p>
                        <input name="phoneNumber" defaultValue={phoneNumberSaved} minLength={10} maxLength={10} pattern={'[0-9]+'} type='text' id='phoneNumber' autoFocus ref={phoneNumber} />
                    </div>
                </form>
                <button onClick={sendSettings}> Actualizar mi perfil </button>


            </div>
        </>
    )
}

export default Settings;