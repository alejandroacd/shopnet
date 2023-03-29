import React, { useEffect, useState } from 'react'
import {BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs'


const Slider =  (props) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [urls,setUrls] = useState([])
    const isJustOnePhoto = urls.length !== 1
    
    const nextSlide = () => {
        const isLastSlide = currentIndex === urls.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? urls.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }
    useEffect(() => {
        
        const filteringSlidesProp = async (obj) => {
            setUrls(Object.values(obj).filter(Boolean))
        }       
    
        filteringSlidesProp(props.slides)
        console.log(isJustOnePhoto)

    },[props.slides,isJustOnePhoto])


    return (
        <>


            <div className='product-slider' style={{backgroundImage: urls[0] ? `url(${urls[currentIndex]})` : 'none' }}>
                <div className='button-slider' style={{}}>
                    <BsArrowLeftCircleFill size={35} onClick={prevSlide} className='left-button' />
                    <BsArrowRightCircleFill size={35} onClick={nextSlide} className='right-button' />
                </div>

            </div>
        </>
    )
}


export default Slider