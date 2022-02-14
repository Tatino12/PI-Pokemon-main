import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../actions";
import './SearchBar.css'


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        
    //console.log(name)
    }
 
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNamePokemons(name)) // este name va a ser mi estado local, 
        //este (name)  va a ser lo que esta escribiendo el usuario
        setName('')
    }


return (
    <div>
        <input className='search_input'
        type = 'text'
        placeholder = "Search..."
        value ={name}
        onChange={(e) => handleInputChange(e)}
        />
        <button className='search_button' type='submit' onClick={(e) => handleSubmit(e)}>Search Pokemon</button>
    </div>

    
)
}