import React, { useEffect, useState } from 'react'
import '../Dashboard/Dashboard.css'
import ProductCard from '../ProductCard/ProductCard'
import Search from '../Search/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'


const Dashboard = (props) => {
    const queryString = window.location.search
    const decoded = new URLSearchParams(queryString)
    const value = decoded.get('categoria')
    const [datita, setData] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
     useEffect(() => {
            axios.get('https://shopnet.up.railway.app/api/products')
                .then(res => {
                    console.log(res.data)
                    setLoading(false)
                    setData(res.data)
                })
        }, [])
        
    const finalValue = datita.filter(product => product.categorie.toLowerCase() === value)

    useEffect(() => {
        console.log(finalValue)
    },[finalValue])
    
    return (
        <div className='dashboard-container'>
            {props.filter !== 'All' ? 
            <BiArrowBack style={{color: 'var(--primary)', margin: '1em'}} onClick={() => navigate(-1)} />: null}
            <h1> {value ? `Categoria: ${value} `: 'úlimos posts'} <span> _ </span> </h1>
            {finalValue.length === 0 && props.filter !== "All" && loading === false ? <h1> Todavía no hay productos de esta categoría <span> :( </span> </h1> : null}
        

            {loading && <div className='loading-block'><div className="lds-dual-ring"></div></div>}

            {finalValue.length > 0 && <div className='product-container'>
                  {finalValue.map((x, y) => {
                      return (
                          <ProductCard url={x._id} image1={x.image1} price={x.price} productName={x.productName} key={x._id} photoOfSeller={x.photoOfSeller} />
                      )
                  })}
              
          </div>}

          {props.filter === "All" && 
          <div className='product-container'>
          {datita.map((x, y) => {
              return (
                  <ProductCard url={x._id} image1={x.image1} price={x.price} productName={x.productName} key={x._id} photoOfSeller={x.photoOfSeller} />
              )
          })}
      
  </div> }



          </div> 
      
    )
}

export default Dashboard