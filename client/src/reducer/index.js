    
   
    
    const initialState = {
        pokemons : [], // le pasamos un estado inicial
        allPokemons: [],
        allTypes: []
    }
    
    function rootReducer (state = initialState, action){
        switch (action.type) {
            case 'GET_POKEMONS':
                return{
                    ...state,
                    pokemons: action.payload, // manda todo lo que te mande, la accion get_pokemons
                    allPokemons: action.payload
                }
           /*  case 'GET_TYPES':
                return{
                    ...state,
                    allTypes: action.payload
                }     */
            case 'FILTER_TYPES':
                //en el reducer hago la logica siempre antes del return
                const allPokemons = state.allPokemons
                const typesFiltered = action.payload === 'all' ? allPokemons : allPokemons.filter(e => e.types.includes(action.payload))
                return {
                    ...state,
                    pokemons: typesFiltered
                }
            case 'FILTER_CREATED':
                const allPokemons2 = state.allPokemons
                const createdFilter = action.payload === 'created' ? allPokemons2.filter(el => el.createdInDb) : allPokemons2.filter(el => !el.createdFilter)
                    return{
                        ...state,
                        pokemons: action.payload === 'all' ? state.allPokemons : createdFilter
                    }
            case 'ORDER_BY_NAME':
                const arr = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b){ // el sort me compara dos valores
                    if(a.name > b.name){
                        return 1;
                    }
                    if(a.name < b.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function (a, b) {
                    if(a.name > b.name){
                        return -1;
                }
                    if(a.name < b.name ){
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    pokemons: arr
                }

            default:
                return state;
        }
    }




    export default rootReducer;