    
    const initialState = {
        pokemons : [] // le pasamos un estado inicial
    }
    
    function rootReducer (state = initialState, action){
        switch (action.type) {
            case 'GET-POKEMONS':
                return{
                    ...state,
                    pokemons: action.payload // manda todo lo que te mande la accion get_pokemons
                }
        
            default:
                return state;
        }
    }




    export default rootReducer;