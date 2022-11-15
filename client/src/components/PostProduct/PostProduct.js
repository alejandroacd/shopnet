import React, { useEffect } from 'react';
import Slider from 'react-slick'
import "../PostProduct/slick-theme.css";
import "../PostProduct/slick.css";
import '../PostProduct/PostProduct.css'

const PostProduct = () => {
    const settings = {
       className: "center",
       centerMode: true,
       infinite: true,
       centerPadding: "60px",
       slidesToShow: 1,
       speed: 500,
      arrows:false
  };
  return (

    <div className='form_container'>
      <h2> Vendé<span className='underscore'>_</span></h2>
      <Slider {...settings}>
        <div className='form-photo'>
          <h3>1</h3>
        </div>
        <div className='form-photo'>
          <h3>2</h3>
        </div>
        <div className='form-photo'>
          <h3>3</h3>
        </div>
        <div className='form-photo'>
          <h3>4</h3>
        </div>
        <div className='form-photo'>
          <h3>5</h3>
        </div>
        <div className='form-photo'>
          <h3>6</h3>
        </div>
      </Slider>
    </div>

  )
}

export default PostProduct