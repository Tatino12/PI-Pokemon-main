
const { Pokemon, Type } = require("../db.js");

const axios = require("axios");


//TRAIGO LA INFO de la API //
const getAllPokemons = async () => {
    const infoApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
    const infoApiPokemons = infoApi.data.results;
  
   //const infoApi1 = await axios.get(infoApi.data.next);
   // const infoApiPokemons1 = infoApi1.data.results;
   //const allPokeInfoApi = infoApiPokemons.concat(infoApiPokemons1);
   let subresquest = infoApiPokemons.map((el) => axios.get(el.url));
  
    let pokemonesApi = await Promise.all(subresquest);
 
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
        sprite: poke.data.sprites.other["official-artwork"].front_default,
        types: poke.data.types.map((el) => el.type.name),
      };
    });
//console.log(pokemonesApi)    


  //TRAIGO LA INFO de mi Base de Datos. 
 const infoDb = await Pokemon.findAll({include: {
   model: Type, 
   attributes: ["name"],
   through: {attributes: []},
    
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
      sprite: poke.dataValues.sprite,
      types: poke.dataValues.types.map((el) => el.name),
      createdInDb: poke.dataValues.createdInDb,
    }; 
  });
  

//me permite unir el array que me devuelve la pokeapi (40) pokemons + los pokemons creados en la DB pokemons
  const infoTotal = [...pokemonesApi, ...pokemonesDb];
//console.log(infoTotal)
  return infoTotal;
};





const pokemonDetails = async (idPokemon) => {
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




module.exports = { getAllPokemons, pokemonDetails }