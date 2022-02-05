import axios from 'axios';

export function getPokemons(){
     return async function(dispatch){ // aca se produce la conexion entre el back end y el front end
        const json = await axios.get("http://localhost:3001/pokemons")
        // el axios por default me hace el get, asique podria no ponerlo
      
        return dispatch({ // el axios me retorna un data y si lo hago con fetch me da un .then
            type: 'GET_POKEMONS',
            payload: json.data
        })
   
    }
}

/* export function getTypes(){
    return async function(dispatch) {
        
            const json = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: 'GET_TYPES',
                payload: json.data
            });
      }
}; */

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
