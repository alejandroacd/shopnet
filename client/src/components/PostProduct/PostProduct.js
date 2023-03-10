import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick'
import axios from 'axios'
import "../PostProduct/slick-theme.css";
import "../PostProduct/slick.css";
import '../PostProduct/PostProduct.css'
import { BiAddToQueue } from 'react-icons/bi'
import { Navigate } from 'react-router-dom'
import { succesfullAlert, errorAlert } from '../alerts'

const PostProduct = () => {

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const nameRef = useRef()
  const descriptionRef = useRef()
  const priceRef = useRef()
  const categorieRef = useRef()
  const image1 = useRef()
  const [imagesForm, setForm] = useState({})
  const nameRegEx =  /^([A-Za-z0-9]{5,50})$/
  const [photoError,setPhotoError] = useState('')
  const [nameError, setNameError] = useState('')
  const [errorPrice, setErrorPrice] = useState('')
  const[loading, setLoading] = useState(false)

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true, 
        }
      }]
  };

  const pickImage = (selected) => {
    let nameOfAttr = selected.target.id
    setForm({
      ...imagesForm,
      [nameOfAttr]: selected.target.files[0]
    })

    selected.target.parentNode.style.backgroundImage = `url(${URL.createObjectURL(selected.target.files[0])})`
  }

  const sendNewProduct = (e) => {
    e.preventDefault();
    setLoading(true)

    const efectivo = document.getElementById('efectivo')
    const mercadopago = document.getElementById('mercadopago')
    const nameIsValid = nameRegEx.test(nameRef.current.value)
    const formToServer = new FormData()

    const form = {
      userId: user._id,
      productName: nameRef.current.value,
      description: descriptionRef.current.value,
      categorie: categorieRef.current.value,
      price: priceRef.current.value,
      photoOfSeller: user.image,
      nameOfSeller: `${user.name} ${user.lastName}`,
      mercadoPagoAccessTokenOfUser: user.mercadopagoAccessToken,
      ...imagesForm,
      paymentMethods: JSON.stringify({
        efectivoIsChecked: efectivo.checked ? true : false,
        mercadoPagoIsChecked: mercadopago.checked ? true : false,
      })
    } 
    for(let key in form){
      formToServer.append(key, form[key])
    }

    if(nameIsValid == false){
      setLoading(false)
      setNameError('Intentá colocando un nombre para el producto que tenga entre 5 y 50 caractéres')
      return;
    }

    if(priceRef.current.value === ""){
      setLoading(false)
      setErrorPrice('Debes introducir un precio')
      return
    }
    if(Object.keys(form).length === 8){
      setLoading(false)
      setPhotoError('Debes agregar al menos una foto')
      return;
    }


    else {

        axios.post(`https://shopnet.up.railway.app/api/products`, formToServer, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then((res) => {
        setLoading(false)
        succesfullAlert(res.data.message)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        errorAlert(err.message)
      }) 
    }
  }


  return (
    <>
    {!token && <Navigate to="/login"/>}

    {loading ? 
     <div className='loading-block'><div className="lds-dual-ring"></div> </div>
     
     :
     
     <div className='form_container'>
      <h2> Vendé <span className='underscore'>_</span></h2>

      <form method='POST' to="https://shopnet.up.railway.app/api/products" >

        <label htmlFor="productPhotos"> Agregá fotos del producto (mínimo una): </label>
        <br />
        {photoError ? <p className='error'> {photoError} </p> : null}
        <br />
        <Slider {...settings}>
          <div ref={image1} className='form-photo'>
            <input type='file' id="image1" onChange={(e) => pickImage(e)} />
            <BiAddToQueue size={15} />
          </div>
          <div className='form-photo'>
            <input type='file' id="image2" onChange={(e) => pickImage(e)} />
            <BiAddToQueue size={15} />
          </div>
          <div className='form-photo'>
            <input type='file'id="image3" onChange={(e) => pickImage(e)} />
            <BiAddToQueue size={15} />
          </div>
          <div className='form-photo'>
            <input type='file'id="image4" onChange={(e) => pickImage(e)} />
            <BiAddToQueue size={15} />
          </div>
          <div className='form-photo'>
            <input type='file'id="image5" onChange={(e) => pickImage(e)} />
            <BiAddToQueue size={15} />
          </div>
          <div className='form-photo'>
            <input type='file'id="image6" onChange={(e) => pickImage(e)} />
            <BiAddToQueue size={15} />
          </div>
        </Slider>

        <label htmlFor='productName'> Nombre del producto: </label>
        <br />
        {nameError ? <p className='error'> {nameError} </p> : null}
        <br />
        <input className='input-texts' ref={nameRef} type="text" name="productName" id="productName"required />

        <label htmlFor='productDescription'> Descripción del producto: </label>
        <br />

        <textarea className='input-texts' ref={descriptionRef} rows="4" cols="50" name="productDescription" />
        <br />

      
        <label htmlFor='productCategorie'> Categoría: </label>
        <br/>
        <select ref={categorieRef} defaultValue={"Otro"} className='product_select'>
          <option value="Moda"> Moda </option>
          <option value="Libros"> Libros </option>
          <option value="Tecnología"> Tecnología </option>
          <option value="Electrodomésticos"> Electrodomésticos </option>
          <option value="Hogar"> Hogar </option>
          <option value="Deportes"> Deportes </option>
          <option value="Música"> Música</option >
          <option value="Cosméticos"> Cosméticos </option>
          <option value="Otro"> Otro </option>
        </select>
        <br/>

        <label>Precio:</label>
        <br />
        {errorPrice ? <p className='error'> {errorPrice} </p> : null}
       
        <div className='price_container'>

          <label htmlFor='productPrice'> $ </label>
          <input className='input-texts' type='number' ref={priceRef} name='productPrice' required />

        </div>

        <label>Formas de pago: </label>

        <div className='checkmark_container'>
        
        <input className="input-checkmark"  type="checkbox" id="efectivo" value="Efectivo" />
        <label htmlFor='Efectivo'> Efectivo </label><br/>
        <input className="input-checkmark"  id="mercadopago" type="checkbox" value="MercadoPago" />
        <label htmlFor='Mercadopago'> Mercadopago </label>

        </div>
         
        <button onClick={sendNewProduct} className="submit_product_button" type='submit'> Publicar </button>

      </form>

      
    </div>}
    </>

  )
}

export default PostProduct