import React, {useState}  from 'react'
import '../components/jeje.css'
const Component = () => {

    const [counter,setCounter] = useState(0);



    return (
        <div className='conteiner' >
            <div className='box'>
                <p> {counter}  </p>
                <button onClick={ () => {setCounter(counter + 1)}}> increase </button>
                <button onClick={ () => {setCounter(counter - 1)}}> decrease </button>

            </div>
        </div>
    )
}

export default Component