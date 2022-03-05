import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { postPokemons, getTypes } from '../../actions'
import './CreatePokemon.css'

function validate(el) {
  let errors= {}
  if(!el.name) errors.name= 'Name must be completed'
  if(el.types.length === 0 || el.types.length > 2) errors.types = 'Types required'
  if(!el.hp || el.hp <= 0) errors.hp = 'HP required > 0'
  
  return errors
}


function buttonHab(p) {
    if (Object.keys(p).length === 0) return false;
    else return true; 
  }


export default function PokemonCreate() {
  const dispatch= useDispatch()
  
  const types= useSelector(state=> state.allTypes)
  const [err, setErr]= useState({})
  const [but,setBut] = useState(true)
  const [input, setInput]= useState({
    name:"",
    hp:"",
    attack:"",
    defense:"",
    speed:"",
    height: "",
    weight:"",
    sprite: "",
    types:[],
  })

  function handleChange(e) {

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErr(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }
 
  

  
  function handleSelect(e) {
    input.types.length < 2 && !input.types.includes(e.target.value) ? setInput({
      ...input,
      types:[...input.types, e.target.value]
    }) : alert('Maximum two types')
    setErr(validate({ ...input, types: [...input.types, e.target.value] }));
    //console.log(types)
  } 
  

  

  function handleSubmit(e) {
    e.preventDefault()
   // console.log(input)
    dispatch(postPokemons(input))
    alert("Pokemon has been created")
    setInput({
      name:"",
      hp:"",
      attack:"",
      defense:"",
      speed:"",
      height:"",
      weight:"",
      sprite: "",
      types:[],
    })
  }

  function handleDelete(e) {
    //console.log(e.target.name)
    setInput({
      ...input,
      types: input.types.filter((el) => el !== e)
    })
  } 


   useEffect(()=> {
    setBut(buttonHab(err))
    dispatch(getTypes())
  },[err, dispatch]) 
  

  
  
  return(
    <div className='cp_img_fondo'>
    
      <h1 className='cp_title'>Create a Pokémon</h1>
      <div className='cp_form'>
        <form id='formulario' onSubmit={(e)=> handleSubmit(e)}>

          <div>
            <label>Name: </label>
            <input className='cp_input' type="text" value={input.name} name="name" onChange={handleChange} />
            {err.name && (<p>{err.name}</p> )}

            <label>Hp:</label>
            <input className='cp_input' type="number" value={input.hp} name="hp" onChange={handleChange} />
            {err.hp && (<p>{err.hp}</p>)}

            <label>Attack:</label>
            <input className='cp_input' type="number" value={input.attack} name="attack" onChange={handleChange} />
            {err.attack && (<p>{err.attack}</p>)}

            <label>Defense:</label>
            <input className='cp_input' type="number" value={input.defense} name="defense" onChange={handleChange} />
            {err.defense && (<p>{err.defense}</p>)}

            <label>Speed: </label>
            <input className='cp_input' type="number" value={input.speed} name="speed" onChange={handleChange} />
            {err.speed && (<p>{err.speed}</p>)}

            <label>Height: </label>
            <input className='cp_input' type="number" value={input.height} name="height" onChange={handleChange} />
            {err.height && (<p>{err.height}</p>)}

            <label>Weight: </label>
            <input className='cp_input' type="number" value={input.weight} name="weight" onChange={handleChange} />
            {err.weight && (<p>{err.weight}</p>)}

            <label>Sprite: </label>
            <input className='cp_input' type="text" value={input.sprite} name="sprite" onChange={handleChange}/>

          
    <div>
         <div>
            <label>Types: </label>
            <select className="cp_input" onChange={handleSelect} >
              {types?.map((el) => (
                <option  value={el.name} key={el.id}> {el.name} </option>
              ))}
            </select>
          </div>
          <button className='cp_button_create' type="submit" disabled={but} form='formulario'>Create</button>
          <Link to='/home'><button className='cp_button_return'>Return</button></Link>
          <div className="cp_types_box">
            {input.types?.map((el) => (
              <div  className='cp_types'>
                  <button type='cp_button_close' onClick={() => handleDelete(el)}> x </button>
                <p>{el}</p>
              </div>
            ))}
          </div>
          {err.type && (<p>{err.type}</p>)}
        </div>
        </div>
      
        </form> 
</div>
</div>

  )
}

