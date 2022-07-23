import React from 'react';
import '../Settings/Settings.css'
import { Navigate } from 'react-router-dom'


const Settings = () => {
    let token = localStorage.getItem('token');

    
    return (
        <>

        {!token && <Navigate replace to='/' />}


        </>
    )
}

export default Settings;