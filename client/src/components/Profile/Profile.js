import React, { useEffect, useState, useRef } from 'react';
import '../Profile/Profile.css'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import swal from 'sweetalert'
import { Navigate } from 'react-router-dom'

const Profile = () => {
    let token = localStorage.getItem('token');
    const [loading,setLoading] = useState(false)
    const backgroundRef = useRef();
    const formRef = useRef();
    const [userLogged, setUserLogged] = useState([]);
    const [mpStatus, setMpStatus] = useState(false)
    const [file, setFile] = useState();
    const params = useParams();
    const mercadoPagoAuthLink = `https://auth.mercadopago.com/authorization?client_id=72333279858722&response_type=code&platform_id=mp&state=${params.id}&redirect_uri=http://localhost:3000/successfullBinding`
    
    const succesfullAlert = () => {
        return swal({
            title: 'Tu foto ha sido actualizada con éxito :)',
            icon: 'success',
            timer: '3000'
        })
    }

    const deleteMpAlert = () => {
        return swal({
            title: 'Desasociaste tu cuenta de Mercado Pago',
            icon: 'info',
            timer: '3000'
        })
    }

    // Eliminar token 
    const logout = () => {
        localStorage.clear()
        window.location = "/"
    }

    // previsualiza la imágen antes de enviarla al server 
    const pickThisImage = (e) => {
        setFile({
            image: e
        })
        backgroundRef.current.style.backgroundImage = `url(${URL.createObjectURL(e)})`;
    }

    // envia la imágen al servidor 
    const enviarImagen = () => {
        const form = new FormData();
        for (let key in file) {
            form.append(key, file[key])
        }
        axios.post(`http://localhost:3001/api/users/me/${params.id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(
                succesfullAlert()
            )
            .catch((e) => {
                console.log(e)
            })
    }



    const deletingAccessToken = () => {
        deleteMpAlert()
        setMpStatus(false)
        axios.post('http://localhost:3001/api/users/deleteAccessToken', {
            id: userLogged._id
        })
        .then(() => {
            console.log('borrado')
            })
        .catch((e) => console.log(e))
    }

    // Seteo de token.
    useEffect(() => {
        
        setLoading(true)
        axios.get('http://localhost:3001/api/users/me', {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then((res) => {
                setUserLogged(res.data)
                setLoading(false)
                if(res.data.mercadopagoAccessToken !== null){
                    setMpStatus(true)
                }
            })
            .then(
                userLogged.userImage ? backgroundRef.current.style.backgroundImage = `url(${userLogged.userImage})` : null
            )

            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }, [userLogged.userImage,mpStatus])

    return (
        <>

        {!token && <Navigate replace to='/'/>}
            <div className='profile-container'>
                <div className='profile_info'>
                    <div ref={backgroundRef} className='image_container'>
                        <form ref={formRef} method='POST' action="http://localhost:3001/api/users/me/:id">
                            <input type='file' name="image" onChange={(e) => pickThisImage(e.target.files[0])} />
                            <FiEdit size={30} />
                        </form>
                    </div>
                    <button className='image-submit' type='submit' onClick={enviarImagen}> Guardar foto </button>

                    <h1> {userLogged.name} {userLogged.lastName} </h1>
                    <p> Barrio: </p>
                    <p>Número telefónico:</p>
                </div>

                {
                    localStorage.getItem('token')
                        ?
                        <>
                            <button onClick={logout}> Cerrar Sesión </button>
                            <button> Editar Perfil </button> </>
                        : null
                }

                {
                    mpStatus
                        ? <button onClick={deletingAccessToken}> Desasociar MercadoPago  </button> 
                        : <button><a href={mercadoPagoAuthLink}> Asociar MercadoPago </a> </button>     
                }

            </div>
        </>
    )
}

export default Profile;