import React, { useEffect, useRef, useState } from 'react'
import '../Search/Search.css'
import { BiArrowBack, BiSearchAlt2 } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'


const Search = () => {
    const [search,setSearch] = useState('')
    const inputRef = useRef('')
    const navigate = useNavigate()

    const handleChange = () => {
        setSearch(inputRef.current.value)
    }
    useEffect(() => {
        console.log(search)
    }, [search])

    return (
        <>            
            <div className='search_container'>
                <input ref={inputRef} onChange={() => handleChange()} className='search-global' type='text' placeholder='Buscá lo que quieras...' />
                <BiSearchAlt2 size={35} />
            </div>
        </>

    )
}

export default Search;