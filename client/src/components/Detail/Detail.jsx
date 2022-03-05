import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetails } from "../../actions";
import { useEffect } from "react";
import './Detail.css'

export default function Detail(props){

    const dispatch = useDispatch()
    const pokemonId = props.match.params.id

    useEffect(() => {
        dispatch(getDetail(pokemonId));
        return () => dispatch(cleanDetails());
      }, [dispatch, pokemonId]);


const myPokemon = useSelector((state) => state.pokemonDetails)

return (
    <div className="img_fondo3">
        {Object.keys(myPokemon).length > 0 ?
            <div className="detail_body">
                <h1 className="detail_title">I`M {myPokemon.name.toUpperCase()}</h1>
                <img className="img" src={myPokemon.sprite} />
                <h3 className="detail_types">Types: {myPokemon.types.join(' ')}</h3>
                <p>Id: {myPokemon.id} </p>
                <p>Hp: {myPokemon.hp}</p>
                <p>Attack: {myPokemon.attack}</p>
                <p>Defense: {myPokemon.defense}</p>
                <p>Speed: {myPokemon.speed}</p>
                <p>Height: {myPokemon.height}</p>
                <p>Weight: {myPokemon.weight}</p>

            </div> : <p>Loading...</p>       
        }
        <Link to='/home'><button className='detail_goBack'>Go Back to Home</button></Link>
    </div>
 )
}