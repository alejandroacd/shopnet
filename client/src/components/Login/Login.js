import React, { useRef, useState, useEffect } from 'react';
import '../Login/Login.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'



const Login = () => {

    let token = localStorage.getItem('token')
    let id = localStorage.getItem('id')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;



    const loguear =  async (e) => {
        setLoading(true);
        e.preventDefault();
        const isValid = expReg.test(emailRef.current.value);

        if(!isValid){
            setLoading(false);
            setError('Introducí un email válido :)')
        }

          else if(isValid){
            axios.post('http://localhost:3001/api/users/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            .then(res => {
                console.log(res.data)
                setLoading(true)
                const {token, _id } = res.data
                if(token,_id) {
                    window.location.href = `/me/${_id}`
                    localStorage.setItem('token', token)
                    localStorage.setItem('id',_id)
                } 
            })
            .catch(err => {
                setLoading(false)
                setError('Usuario y/o contraseña inválido')
            
            
            })
        }
    }

    return (

        <>
        
        {token && <Navigate replace to={`me/${id}`}/>}

        <div className='login-container'>

            {loading 
            ?
            <p>Cargando Información </p>
            
            :
            <>
            <h1>Inicia sesión :)</h1>
            <p> Para poder postear y comprar productos </p>     
            { error ? <div className="error">
                <p> {error} </p>
      </div> : null}    
            <form method="POST" action="http://localhost:3001/api/users/login">
                <label htmlFor="email"> Correo electrónico </label>
                <input name="email" ref={emailRef} placeholder="Escribe tu e-mail..." type="email" autofocus="autofocus" />
                <label htmlFor="password"> Contraseña </label>
                <input name="password" ref={passwordRef} placeholder="Escribe tu contraseña" type="password" />
                <p>No tienes cuenta? <Link to="/signup">Registrate acá!</Link></p>
                <button className='register_button' onClick={loguear} > Login </button>
            </form>
            </>
            }
        
        </div>


     </>  
    )
}

export default Login;