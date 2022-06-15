import React, {useState, useRef, useEffect} from 'react'
import '../Signup/Signup.css'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Signup = () => {

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState();
    const name = useRef();
    const lastName = useRef();
    const email = useRef()
    const password = useRef()
    const password2 = useRef()
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


    useEffect(() => {
        if(localStorage.getItem('token')){
            window.location.href = `me/${localStorage.getItem('id')}`
        }
    },[])

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        var isValid = expReg.test(email.current.value)

        // errores

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
            axios.post('http://localhost:3001/api/users', {
                name: name.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                password: password.current.value
            }) 
            .then((res) => {
                setLoading(false)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id',res.data_id)
                window.location.href = `/me/${res.data._id}`
            })
            .catch(error => {
                setLoading(false)
                setError('Error en el servidor. Mensaje de orígen: ' + error.message)
            })
        }
    }
    return (
        
        <div className='signup-container'>
            {loading 
            
            ? 
            
            <p> Cargando Información </p>
            
            :
            <form method='POST' action='http://localhost:3001/api/users' >
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
            
         
            
       
    )
}

export default Signup