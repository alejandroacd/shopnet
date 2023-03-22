import React, { useEffect, useState } from 'react'
import '../Dashboard/Dashboard.css'
import ProductCard from '../ProductCard/ProductCard'
import Search from '../Search/Search'
import axios from 'axios'


const Dashboard = () => {
    const [datita, setData] = useState([])


        useEffect(() => {
            axios.get('https://shopnet.up.railway.app/api/products')
                .then(res => {
                    console.log(res.data)
                    setData(res.data)
                })
        }, [])


    useEffect(() => {
        console.log(datita)
    }, [])



    return (
        <div className='dashboard-container'>
            <h1> Latest posts <span>_</span></h1>
            <Search />


            <div className='product-container'>
                {datita.map((x, y) => {
                    return (
                        <ProductCard url={x._id} image={x.image1} price={x.price} productName={x.productName} key={x._id} photoOfSeller={x.photoOfSeller} />
                    )
                })}
            </div>
        </div>
    )
}

export default Dashboard