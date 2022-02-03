
const { Pokemon, Type } = require("../db.js");

const axios = require("axios");




/* const getApiInfo = async () => { //me TRAIGO LA INFO de la API
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon") // uso async await xq uno nunca sabe cuanto va a demorar la respuesta,
                               //entonces tengo que avisarle que tiene que esperar a la respuesta 
                               // antes de agregar informacion a la api url --- trabajo de manera asincrona.
   
   const apiInfo = await apiUrl.data.results.map(obj => obj.url ) // me va a traer la info en un .data
   const apiUrl2 = await axios.get(apiUrl.data.next) // que me traiga los siguientes 20 pokemones
   const apiInfo2 = await apiUrl2.data.results.map(obj => obj.url )
   const allApiInfo = [...apiInfo, ...apiInfo2] // concateno los 40 poke

   const arrayGetPokemon = allApiInfo.map(e => axios.get(e)) 
   const pokemonPromise = await Promise.all(arrayGetPokemon)
   const pokemonFilter = pokemonPromise.map(obj => {

            return {                                   //lo mapeo para traerme solo esa info(name,heigth,weight etc)
           id: obj.data.id,                             // le digo devolveme solamente lo que yo necesito del back para mi aplicacion
           name: obj.data.name,                         // que en este caso seria todo lo que me piden en el readme
           hp: obj.data.stats[0].base_stat,
           attack: obj.data.stats[1].base_stat,
           defense: obj.data.stats[2].base_stat,
           speed: obj.data.stats[5].base_stat,
           height: obj.data.height,
           weight: obj.data.weight,  
           sprite: obj.data.sprites.other.dream_world.front_default,       
           types: obj.data.types.map(obj => obj.type.name),      // aca mapeo para que me traiga todos los tipos                     
      
       }
   })
   
   return pokemonFilter;
}; */


const getAllPokemons = async () => {
    const infoApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
  
    const infoApiPokemons = infoApi.data.results;
  
    //const infoApi1 = await axios.get(infoApi.data.next);
  
   // const infoApiPokemons1 = infoApi1.data.results;
  
    //const allPokeInfoApi = infoApiPokemons.concat(infoApiPokemons1);
  
    let subresquest = infoApiPokemons.map((el) => axios.get(el.url));
  
    let pokemonesApi = await Promise.all(subresquest);
   console.log(pokemonesApi)
    pokemonesApi = pokemonesApi.map((poke) => {
      return {
        id: poke.data.id,
        name: poke.data.name,
        hp: poke.data.stats[0].base_stat,
        attack: poke.data.stats[1].base_stat,
        defense: poke.data.stats[2].base_stat,
        speed: poke.data.stats[5].base_stat,
        height: poke.data.height,
        weight: poke.data.weight,
        sprite: poke.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
        types: poke.data.types.map((el) => el.type.name),
      };
    });


/* //Me traigo los datos de los pokemones de la Base de Datos
const getDbInfo = async () => { // me TRAIGO LA INFO de mi Base de Datos. 
           return await Pokemon.findAll({
       include: { 
           model: Type,
           attributes: ["name"], //traigo solo name xq el ID me lo trae junto al name solo.
           through: {           // le digo traeme el nombre del tipo de un determinado pokemon (agua,fuego ,aire etc)
               attributes: [], //el through significa : traeme el name "mediante los atributos" es una 
                               //comprobacion que se hace siempre cuando me quiero traer una tributo
           }
       } 
   })
} */

const infoDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });


const pokemonesDb = infoDb.map((poke) => {
    return {
      id: poke.dataValues.id,
      name: poke.dataValues.name,
      hp: poke.dataValues.hp,
      attack: poke.dataValues.attack,
      defense: poke.dataValues.defense,
      speed: poke.dataValues.speed,
      height: poke.dataValues.height,
      weight: poke.dataValues.weight,
      sprite: "https://giphy.com/gifs/reaction-mood-8UGGp7rQvfhe63HrFq",
      types: poke.dataValues.Types.map((el) => el.name),
      createdInDb: poke.dataValues.createdInDb,
    };
  });


//me permite unir el array que me devuelve la pokeapi (40) pokemons + los pokemons creados en la DB pokemons
  const infoTotal = [...pokemonesApi, ...pokemonesDb];

  return infoTotal;
};


/* // Concateno los datos de los pokemons de la API con los de la Base de Datos
const getAllPokemons = async () => {
   
   const apiInfo = await getApiInfo();
   const dbInfo = await getDbInfo(); 
   
   const infoTotal = apiInfo.concat(dbInfo);
   
   return infoTotal;
} */

const pokemonDetail = async (idPokemon) => {
    try {
      const pokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
      );
  
      if (pokemon) {
        const data = pokemon.data;
  
        const pokeID = {
          id: data.id,
          name: data.name,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          height: data.height,
          weight: data.weight,
          sprite: data.sprites.front_default,
          types: data.types.map((el) => el.type.name),
        };
  
        return pokeID;
      } else {
        return {};
      }
    } catch (err) {
      return {};
    }
  };




module.exports = { getAllPokemons, pokemonDetail }