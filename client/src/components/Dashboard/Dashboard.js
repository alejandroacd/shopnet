import React, { useEffect,useState } from 'react'
import '../Dashboard/Dashboard.css'
import ProductCard from '../ProductCard/ProductCard'
import axios from 'axios'



const Dashboard = () => {
    const [datita,setData] = useState([])

useEffect(() => {
    axios.get('http://localhost:3001/api/products')
    .then(res => {
        console.log(res.data)
        setData(res.data)
    })
},[])
    return (
        <div className='dashboard-container'>
            <h1> Latest posts</h1>
        
        <div className='product-container'>
            {datita.map((x,y) => {
                return (
            <ProductCard image={x.imgUrl1} price={x.price} productName={x.name} />
                )
            })}
      </div>
        </div>
    )
}

export default Dashboard