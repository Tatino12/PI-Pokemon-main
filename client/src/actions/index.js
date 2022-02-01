import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){ // aca se produce la conexion entre el back end y el fron end
        const json = await axios.get("https://localhost:3001/pokemons",{
            
        });
            // el axios por default me hace el get, asique podria no ponerlo
          
            return dispatch({ // el axios me retorna un data y si lo hago con fetch me da un .then
                type: 'GET_POKEMONS',
                payload: json.data
            })
    }
}