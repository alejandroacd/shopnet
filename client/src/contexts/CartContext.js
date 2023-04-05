import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])



    useEffect(() => {
        console.log(favorites)
    }, [])

    const addToFavorites = (product) => {

        const { productName, photoOfSeller, price, url, image } = product
        const id = localStorage.getItem('id')
        let exist = favorites.find(x => x.url === product.url);


        if (!exist) {
            setFavorites([...favorites, { photoOfSeller, productName, price, url, image }])
            
            axios.post('https://shopnet.up.railway.app/api/users/addToFavorites', {
                id,
                productName,
                photoOfSeller,
                price,
                url,
                image,
                pinned:true
            })
                .then(res => {
                    localStorage.setItem('favorites', JSON.stringify(res.data.updated.favorites))
                }
                )
                .catch(e => console.log(e))
        }

        if (exist) {
            const newFavorites = favorites.filter(x => x.url !== url)
            console.log(newFavorites)
            setFavorites(newFavorites)
            axios.post('https://shopnet.up.railway.app/api/users/removeFromFavorites', {
                id,
                url
            })
                .then((res) => {
                    localStorage.setItem('favorites', JSON.stringify(res.data.updated.favorites))
                })
                .catch(e => console.log(e))
        }
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

