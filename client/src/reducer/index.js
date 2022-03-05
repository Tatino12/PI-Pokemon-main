    
   
    
    const initialState = {
        pokemons : [], 
        allPokemons: [],
        allTypes: [],
        pokemonDetails: {},
     
    }
    
    function rootReducer (state = initialState, action){
        switch (action.type) {
            case 'GET_POKEMONS':
                return{
                    ...state,
                    pokemons: action.payload, 
                    allPokemons: action.payload
                }

                
               case 'GET_NAME_POKEMONS':
            const searchName = state.allPokemons.filter((x) => {
                return x.name.includes(action.payload)
            });
           return {
                ...state,
                pokemons: searchName, 
            }                         


            case 'GET_TYPES':
                return{
                    ...state,
                    allTypes: action.payload,
                }    


            case 'POST_POKEMONS':
                return {
                    ...state,
                }
            
            
            case 'FILTER_TYPES':
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
                state.pokemons.sort(function (a, b){ 
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

        
                 case 'ORDER_BY_ATTACK':
                    
                   const sortAtta = action.payload === 'strong' ?
                   state.pokemons.sort(function (a, b) {
                       if(a.attack > b.attack) return -1; 
                       if(b.attack > a.attack) return 1;
                       return 0;
                   })
                   :
                   state.pokemons.sort(function(a, b) {
                    if(a.attack > b.attack) return 1; 
                    if(b.attack > a.attack) return -1;
                    return 0;
                   }) 
                   console.log(sortAtta)
                    return {
                        ...state,
                        pokemons:sortAtta,
                        
                    }    
                    
                case 'GET_DETAILS':
                    return{
                        ...state,
                        pokemonDetails: action.payload
                    }

                case 'CLEAN_DETAILS':
                    return{
                        ...state,
                        pokemonDetails: action.payload
                    }

            default:
                return state;
        }
    }




    export default rootReducer;