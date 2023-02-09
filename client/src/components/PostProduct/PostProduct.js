import React, { useState, useRef } from 'react';
import Slider from 'react-slick'
import axios from 'axios'
import "../PostProduct/slick-theme.css";
import "../PostProduct/slick.css";
import '../PostProduct/PostProduct.css'
import { BiAddToQueue } from 'react-icons/bi'
import { Navigate } from 'react-router-dom'

const PostProduct = () => {

  const token = localStorage.getItem('token')
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

  const nameRef = useRef('');
  const descriptionRef = useRef('');
  const priceRef = useRef('');
  const image1 = useRef();
  const [imagesForm, setForm] = useState({})
  const pickImage = (selected) => {
    let nameOfAttr = selected.target.id;
    setForm({
      ...imagesForm,
      [nameOfAttr]: selected.target.files[0]
    })

    selected.target.parentNode.style.backgroundImage = `url(${URL.createObjectURL(selected.target.files[0])})`
  }
  const form = {
    productName: nameRef.current.value,
    description: descriptionRef.current.value,
    price: priceRef.current.value,
    ...imagesForm
  } 

  const sendNewProduct = (e) => {
    e.preventDefault();

    const formToServer = new FormData()    
    for(let key in form){
      formToServer.append(key, form[key])
    }
    
  }
  
  return (
    <>
    {!token && <Navigate to="/login"/>}
    
    <div className='form_container'>
      <h2> Vendé <span className='underscore'>_</span></h2>
      <form >

        <label htmlFor="productPhotos"> Agregá fotos del producto (mínimo una): </label>
        <br />
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
        <input className='input-texts' ref={nameRef} type="text" name="productName" required />

        <label htmlFor='productDescription'> Descripción del producto: </label>
        <br />
        <textarea className='input-texts' ref={descriptionRef} rows="4" cols="50" name="productDescription" />

        <label>Precio:</label>
        <div className='price_container'>

          <label htmlFor='productPrice'> $ </label>
          <input className='input-texts' ref={priceRef} type="number" name='productPrice' required />

        </div>

        <label>Formas de pago: </label>

        <div className='checkmark_container'>
        
        <input className="input-checkmark" type="checkbox" id="efectivo" value="Efectivo" />
        <label htmlFor='efectivo'> Efectivo </label><br/>
        <input className="input-checkmark" id="Mercadopago" type="checkbox" value="Efectivo" />
        <label htmlFor='Mercadopago'> Mercadopago </label>

        </div>
        <button onClick={sendNewProduct} className="submit_product_button" type='submit'> Publicar </button>

      </form>

      
    </div>
    </>

  )
}

export default PostProduct