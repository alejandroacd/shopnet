import React, { useEffect, useState, useRef } from 'react';
import '../Profile/Profile.css'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { BiArrowBack, BiHome } from 'react-icons/bi'
import {succesfullAlert, deleteMpAlert} from '../alerts'
import { Navigate, Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    let id = localStorage.getItem('id')
    let token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const phoneNumber = localStorage.getItem('phoneNumber') || user.phoneNumber;
    const neighborhood = localStorage.getItem('neighborhood') || user.neighborhood;
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const backgroundRef = useRef();
    const formRef = useRef();
    const [mpStatus, setMpStatus] = useState(false)
    const [file, setFile] = useState();
    const params = useParams();
    const mercadoPagoAuthLink = `https://auth.mercadopago.com/authorization?client_id=72333279858722&response_type=code&platform_id=mp&state=${params.id}&redirect_uri=https://theshopnet.netlify.app/successfullBinding`


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
        axios.post(`https://shopnet.up.railway.app/api/users/me/${params.id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(res => {
                succesfullAlert('Imágen actualizada con éxito')
                localStorage.setItem('newProfilePhoto', res.data.userImage)
            }
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



        if (localStorage.getItem('newProfilePhoto')) {
            backgroundRef.current.style.backgroundImage = `url(${localStorage.getItem('newProfilePhoto')})`
        }

        else if (!localStorage.getItem('newProfilePhoto') && user.image !== "false") {
            backgroundRef.current.style.backgroundImage = `url(${user.image})`
            localStorage.setItem('profilePhoto', user.image)
        }


        if (user.mercadopagoAccessToken !== null) {
            setMpStatus(true)
        }


    }, [user.image, user.mercadopagoAccessToken])

    return (
        <>

            {!token && <Navigate replace to='/login' />}

            <div className='profile-container'>
                <div className='back-button' onClick={() => navigate(-1)}>
                    <BiArrowBack className='arrow_icon' size={20} />
                    <BiHome size={25} />
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
                    <p> {`Barrio: ${neighborhood ? neighborhood : user.neighborhood}`} </p>
                    <p> {`Número telefónico: ${phoneNumber ? phoneNumber : user.phoneNumber}`} </p>
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