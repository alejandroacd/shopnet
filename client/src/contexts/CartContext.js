import axios from "axios";
import { useContext, createContext ,useState, useEffect } from "react";

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({children}) => {

    const [favorites,setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])



    useEffect(() => {
        console.log(favorites) 
    },[])
    const addToFavorites = (product) => {

        const {productName, photoOfSeller,price,url,image} = product

        axios.post('https://shopnet.up.railway.app/api/users/addToFavorites', {
            id: localStorage.getItem('id'),
            productName,
            photoOfSeller,
            price,
            url,
            image
        })
        .then( res => {
            localStorage.setItem('favorites', JSON.stringify(res.data.updated.favorites))
            setFavorites([...favorites, {photoOfSeller,productName,price,url,image}])
        }
        )
        .catch(e => console.log(e))
}


const value = {
    addToFavorites,
    favorites
}

return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
)
}

