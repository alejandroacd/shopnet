import React from 'react'
import '../Search/Search.css'
import { BiSearchAlt2 } from 'react-icons/bi'

const Search = () => {
    return (

        <div className='search_container'>
            <input className='search-global' type='text' placeholder='Buscá lo que quieras...' />
            <BiSearchAlt2 size={35} />
        </div>

    )
}

export default Search;