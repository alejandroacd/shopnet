import React, { useEffect, useState, useRef } from 'react';
import '../Profile/Profile.css'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { BiArrowBack,BiHome } from 'react-icons/bi'
import swal from 'sweetalert'
import { Navigate, Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    let id = localStorage.getItem('id')
    let token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'))
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const backgroundRef = useRef();
    const formRef = useRef();
    const [mpStatus, setMpStatus] = useState(false)
    const [file, setFile] = useState();
    const params = useParams();
    const mercadoPagoAuthLink = `https://auth.mercadopago.com/authorization?client_id=72333279858722&response_type=code&platform_id=mp&state=${params.id}&redirect_uri=https://theshopnet.netlify.app/successfullBinding`
    
    

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
        console.log(e)
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

        console.log(form)
        axios.post(`https://shopnet.up.railway.app/api/users/me/${params.id}`, form, {
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
        axios.post('https://shopnet.up.railway.app/api/users/deleteAccessToken', {
            id: user._id
        })
        .then(() => {
            console.log('borrado')
            })
        .catch((e) => console.log(e))
    }

    // Seteo de token.

    useEffect(() => {

        console.log(user)

        if(user.mercadopagoAccessToken !== null) {
            setMpStatus(true)
        }

        
    },[ ])

    return (
        <>

        {!token && <Navigate replace to='/login'/>}

            <div className='profile-container'>
                <div className='back-button' onClick={() => navigate(-1)}>
                <BiArrowBack className='arrow_icon' size={20}/>
                <BiHome  size={25} />
                </div>
                <div className='profile_info'>
                    <div ref={backgroundRef} className='image_container'>
                        <form ref={formRef} method='POST' action="https://shopnet.up.railway.app/api/users/me/:id">
                            <input type='file' name="image" onChange={(e) => pickThisImage(e.target.files[0])} />
                            <FiEdit size={30} />
                        </form>
                    </div>
                    <button className='image-submit' type='submit' onClick={enviarImagen}> Guardar foto </button>

                    <h1> {user.name} {user.lastName} </h1>
                    <p> {`Barrio: ${user.neighborhood}`} </p>
                    <p> {`Número telefónico: ${user.phoneNumber}`} </p>
                </div>

                {
                    localStorage.getItem('token')
                        ?
                        <>
                            <button onClick={logout}> Cerrar Sesión </button>
                            <Link to={`/me/${id}/settings`}> <button> Editar Perfil </button> </Link>
                            
                         </>
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