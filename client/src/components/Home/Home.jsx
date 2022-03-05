
import React from "react";
import {useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getPokemons, filterPokemonsByTypes, filterCreated, orderByName, orderByAttack } from "../../actions";
import { Link } from "react-router-dom";
import Card from '../Card/Card';
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css'

export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons) 
    
    const [order, setOrder] = useState('') 
    const [orderAttack, setOrderAttack] = useState('')
    const [currentPage, setCurrentPage] = useState(1) 
   
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12) 
    const indexOfLastPokemon = currentPage * pokemonsPerPage 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)



    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) 
        
    }


    useEffect(() => {
        dispatch(getPokemons());
    },[dispatch])

  
    function handleClick(e){
            e.preventDefault(); 
            dispatch(getPokemons()) 
            
        }


    function handleFilterPokemonsByTypes(e){
        dispatch(filterPokemonsByTypes(e.target.value))
        setCurrentPage(1)
                                        
    }


    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        
    }


    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); 
        setOrder(` Ordered  ${e.target.value}` ) 
    };

    function handleSortAttack(e){
        e.preventDefault()
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1)
        setOrderAttack(`Ordered ${e.target.value}`)
    };



    return ( 
        <div className="h_img_fondo">
            <div>
                <h1 className="h_title">POKEMON APP</h1> 
                <Link to='/pokemon'><button className='h_create_button'>Create a Pokémon</button></Link>
            
             <p className='h_searchBar'>
            <SearchBar></SearchBar>
            </p> <button className='h_filter_button' onClick= { e=> {handleClick(e)}}>Reload pokemons</button>
            </div>

            <div className='h_filter_box'>
                <select className="h_select_filter" onChange={e => handleSort(e)}>
                 <option value={null}>Select Asc-Desc Order...</option> 
                    <option value= 'asc'>Ascending order (A-Z)</option>
                    <option value= 'desc'>Descending order (Z-A)</option>
                   </select>

                   <select className="h_select_filter" onChange={e => handleSortAttack(e)}>
                    <option value={null}>Select Order By Attack ...</option>
                    <option value= 'strong'> + Attack</option>
                    <option value= 'weak'> - Attack</option>
                </select>

                <select className="h_select_filter" onChange={e => handleFilterPokemonsByTypes(e)}> 
                 <option value={null}>Select By Types ...</option> 
                    <option value='all'>All types</option>
                    <option value='normal'>Normal</option>
                    <option value='fighting'>Fighting</option>
                    <option value='flying'>Flying</option>
                    <option value='poison'>Poison</option>
                    <option value='ground'>Ground</option>
                    <option value='rock'>Rock</option>
                    <option value='bug'>Bug</option>
                    <option value='ghost'>Ghost</option>
                    <option value='steel'>Steel</option>
                    <option value='fire'>Fire</option>
                    <option value='water'>Water</option>
                    <option value='grass'>Grass</option>
                    <option value='electric'>Electric</option>
                    <option value='psychic'>Psychic</option>
                    <option value='ice'>Ice</option>
                    <option value='dragon'>Dragon</option>
                    <option value='dark'>Dark</option>
                    <option value='fairy'>Fairy</option>
                    <option value='unknown'>Unknown</option>
                    <option value='shadow'>Shadow</option>
                </select>

                <select className="h_select_filter" onChange={e => handleFilterCreated(e)}> 
                <option value={null}>Select Pokemons ...</option> 
                    <option value='all'>All pokemon</option>
                    <option value='api'>Existing </option>
                    <option value='created'>Created</option>
                     </select>
                </div>

                    <div>
                     <Paginado 
                         pokemonsPerPage = { pokemonsPerPage }
                        allPokemons = { allPokemons.length } 
                        paginado = { paginado } /> 
                     </div>

                     <div className="h_card">
                    {currentPokemons.length > 0 ?
                      currentPokemons.map((c) => {
                    return (
                <div>        
                    <Link className='h_card_link' to = {`/detail/${c.id}+${ c.createdInDb ? 'Db' : 'API' }`} >
                    <Card name={c.name} sprite={c.sprite} types ={c.types} key= {c.id}/>
                    </Link>
                    
                </div>
                );
                }) : 
                <div className='h_notfound'>The pokemon you are looking for does not exist</div>
                 } 
            </div>
        </div> 
    )
}

