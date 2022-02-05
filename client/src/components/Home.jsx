
import React from "react";
import {useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getPokemons, filterPokemonsByTypes, filterCreated, orderByName } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card';
import Paginado from "./Paginado";

export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons) //utilizo hooks
    
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1) // me guardo en el estado local la pagina actual,
    // con una constante (setCurrentPage) que me setee la pagina actual... empieza en 1 xq siempre voy a arrancar en la 1er pagina
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12) // puedo poner 12 personajes por pagina
    const indexOfLastPokemon = currentPage * pokemonsPerPage // 12 - mi pagina actual * cant de poke por pagina
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage// 0 -- indice del primer pokemon(indeOfFir...)
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    // pagina - indexOfFirst -   indexOfLast
    //  1 -----     0       ------ 12
    //  2 -----     13      ------ 24
    //  3 -----     25      ------ 36
    //  4 -----     37      ------ 48... pero solo pedi 40 pokes a la api + los que agregue de la base de datos   

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) // seteo la pagina en ese numero de pagina, 
        //me va a ayudar en el renderizado, ahora cuando me desarrolle la solapa Paginado.jsx
    }


    //traemos del estado los pokemones cuando el componente se monta 
    useEffect(() => {
        dispatch(getPokemons());
    },[dispatch])
//console.log(allPokemons)

    //esta funcion la hago para que mi button funcione
    function handleClick(e){
            e.preventDefault(); //preventDefault se lo paso para que no se rompa 
            dispatch(getPokemons()) // esto me lo resetea por si se bugea, y me trae todo denuevo
    }


    function handleFilterPokemonsByTypes(e){
        dispatch(filterPokemonsByTypes(e.target.value)) // devuelve lo que dice el value= (los types)normal, flying, etc 
                                        //dependiendo de cual clikee el usuario, si clickea rock devuelve ese valor de rock
    }


    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }


    function handleSort(e){
        e.preventDefault();//Cancela el evento si este es cancelable, 
        //sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(` Ordered  ${e.target.value}` )
    };




    return ( // hago un boton que me diga crear pokemon  Y  un titulo aguante los pokemones
        <div>
            <Link to='/pokemon'> Create pokemon </Link> 
                <h1>POKEMON APP</h1> 
            <button onClick= { e=> {handleClick(e)}}> 
                Reload pokemons
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value= 'asc'>Ascending order</option>
                    <option value= 'desc'>Descending order</option>
                    <option value= 'attack>'> + Attack</option>
                    <option value= 'attack'> - Attack</option>
                </select>
                <select onChange={e => handleFilterPokemonsByTypes(e)}> 
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
                <select onChange={e => handleFilterCreated(e)}> 
                    <option value='all'>All pokemon</option>
                    <option value='api'>Existing </option>
                    <option value='created'>Created</option>
                </select>
                     <Paginado
                         pokemonsPerPage = { pokemonsPerPage }
                        allPokemons = { allPokemons.length } // le paso .length porque yo necesito un valor numerico
                        paginado = { paginado }
                     />
                     { currentPokemons?.map((c) => {
                    return (
                <div>
                    <Link to = {"/home/" + c.id}>
                    <Card name={c.name} sprite={c.sprite} types ={c.types} key= {c.id}/>
                    </Link>
                </div>
                );
                })}
            </div>
        </div> 
    )
}