import React, {useState, useRef} from 'react';
import '../Settings/Settings.css'
import { Navigate } from 'react-router-dom'
import axios from 'axios';

const Settings = () => {
    let token = localStorage.getItem('token');
    let currentValue = useRef()
    

    const sendSettings = () => {
        axios.post('https://localhost:3001/me/')
    }


    return (
        <>
            {!token && <Navigate replace to='/' />}

            <div className='settings_div'>
                <h1>Edita tu perfil</h1>
                <form method="POST" action="http://localhost:3001/api/users/updateProfile">

                    <label forHtml="neighborhood ">¿En qué barrio te encontrás? </label>

                    <select ref={currentValue} onChange={sendSettings} name="neighborhood" id="neighborhood">
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
                    <label for="neighborhood"> Número telefónico: </label>
                    <input name="neighborhood" type='text' autoFocus />

                    <button> Actualizar mi perfil </button>
                </form>
            </div>
        </>
    )
}

export default Settings;