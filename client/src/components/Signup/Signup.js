import React, {useState, useRef} from 'react'
import '../Signup/Signup.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';


const Signup = () => {

    
    let token = localStorage.getItem('token')
    let id = localStorage.getItem('id')
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState();
    const name = useRef();
    const lastName = useRef();
    const email = useRef()
    const password = useRef()
    const password2 = useRef()
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        var isValid = expReg.test(email.current.value);
        let capitalizedName = name.current.value[0].toUpperCase() + name.current.value.substring(1)
        let capitalizedLastName = lastName.current.value[0].toUpperCase() + lastName.current.value.substring(1)


        // errors

        if(password.current.value !== password2.current.value) {
            setLoading(false)
            setError('Las contraseñas no coinciden :/, intenta de nuevo')
        }
        else if(isValid === false) {
            setLoading(false)
            setError('Email inválido')
        } 
        else if(!name.current.value || !lastName.current.value || !password.current.value || !password2.current.value) {
            setLoading(false)   
            setError('Por favor rellená todos los campos')
        }

        // POST a la api para registrar usuario
        else {
            axios.post('https://shopnet.up.railway.app/api/users', {
                name: capitalizedName,
                lastName: capitalizedLastName,
                email: email.current.value,
                password: password.current.value
            }) 
            .then((res) => {
                setLoading(false)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id',res.data._id)
                localStorage.setItem('user', JSON.stringify(res.data))
                window.location.href = `/me/${res.data._id}`
            })
            .catch(error => {
                setLoading(false)
                setError('Error en el servidor. Mensaje de orígen: ' + error.message)
            })
        }
    }
    return (

        <>

        {
            token && <Navigate replace to={`/me/${id}`}/>
        }
        
        <div className='signup-container'>
            {loading 
            
            ? 
            <p> ... </p>
            
            :
            <form method='POST' action='https://shopnet.up.railway.app/api/users' >
            <h1>Registrate</h1>
            { error ? <div className="error">
                <p> {error} </p>
      </div> : null}
                <label> Nombre</label>
                <input name="name" ref={name} placeholder="Escribe tu nombre completo..." type="text" autofocus="autofocus" ></input>
                <label> Apellido </label>
                <input name="name" ref={lastName} placeholder="Escribe tu nombre completo..." type="text"></input>
                <label> Correo electrónico </label>
                <input name="email" ref={email} placeholder="Escribe tu e-mail..." type="email" required></input>
                <label > Contraseña </label>
                <input name="password" ref={password} placeholder="Escribe tu contraseña" type="password"></input>
                <label > Repetir contraseña</label>
                <input name="password2" ref={password2} placeholder='Repetir contraseña' type="password"></input>

                <p>Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                <button className='register_button' onClick={handleSubmit}> Registrarme! </button>
            </form>
               } 
        </div>
            
        </>
    )
}

export default Signup