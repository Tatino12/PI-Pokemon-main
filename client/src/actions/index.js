import axios from 'axios';

export function getPokemons(){
     return async function(dispatch){ 
        const json = await axios.get("http://localhost:3001/pokemons")
        
      
        return dispatch({ 
            type: 'GET_POKEMONS',
            payload: json.data 
        })
   
    }
}


export function getNamePokemons(payload) {
    return {
        type: 'GET_NAME_POKEMONS',
        payload: payload
    }}; 

export function getTypes(){
    return async function(dispatch) {
        
            const json = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: 'GET_TYPES',
                payload: json.data
            });
      }
}; 

export function postPokemons(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/pokemons", payload)
        return response
    }
}

export function filterPokemonsByTypes(payload){
     return {
            type:'FILTER_TYPES',
            payload
        }
    }


export function filterCreated(payload){
    return {
        type:'FILTER_CREATED',
        payload

    }
}
  
export function orderByName(payload){
    
    return {
        type:'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload){
   
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

export function getDetail(idPokemon){
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/pokemons/${idPokemon}`)
          
                return dispatch({
                    type: 'GET_DETAILS',
                    payload: json.data
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export const cleanDetails = () => {
    return {
        type: 'CLEAN_DETAILS',
        payload: {}
    }
}