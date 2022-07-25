import React from 'react';
import '../Settings/Settings.css'
import { Navigate } from 'react-router-dom'


const Settings = () => {
    let token = localStorage.getItem('token');

    
    return (
        <>
        {!token && <Navigate replace to='/' />}

        <div className='settings_div'>
            <h1>Edita tu perfil</h1>
            <form>
                <label for="neighborhood"> Barrio </label> <br />
                <input name="neighborhood" type='text' />
            </form>
        </div>
        </>
    )
}

export default Settings;