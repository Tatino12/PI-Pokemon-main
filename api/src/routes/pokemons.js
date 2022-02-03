const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const { getAllPokemons, pokemonDetail } = require("../functions/functions.js");

const axios = require('axios').default;

const router = Router();



// RUTAS

/* router.get('/', async (req, res) =>{
    const name = req.query.name // busco si hay una propiedad llamada name en el query y me lo guardo en esa constante
    const pokemonsTotal = await getAllPokemons();
    if(name) {                     //en filter le digo agarra ese nombre y fijate si incluye lo que yo le pase por query, que es "name"
        const pokemonName = await pokemonsTotal.filter((obj) => obj.name.toLowerCase() === name.toLowerCase()) //obj.name es el nombre del pokemon que me va a venir
        pokemonName.length ? // aca pregunto, encontraste algo aca? (es todo el filtrado de arriba)
        res.status(200).send(pokemonName) :    //toLowerCase lo deja preparado para pasar todo a minuscula ...                                              
        res.status(404).send('Pokemon not found');  //me arregla para que si en la api esta en mayuscula , 
       } else {                                       //me lo deje en minuscula y este igual a la base de datos
           res.status(200).send(pokemonsTotal); //en este caso es cuando no hay un query entonces hace esto.
       }                                                                                
   })  */
   router.get("/", async (req, res) => {
    const { name } = req.query;
  
    try {
      // let pokemons = await getAllPokemons();
      // let pokemons = await Pokemon.findAll({include: Type,
      //   attributes: ['id','name','sprite']})
      
      // if (name) {
      //   let pokeName = await pokemons.filter(
      //     (el) => el.name.toLowerCase().trim() === name.toLowerCase().trim()
      //   );

        //   pokeName.length
      //     ? res.status(200).send(pokeName)
      //     : res.status(200).json([]);
      // } else {
      //   res.status(200).send(pokemons);

      // }
      if(!name) {
        // const respuesta = await Pokemon.findAll({include: Type,
        //   attributes: ['id','name','sprite']});
        const respuesta = await getAllPokemons()
          res.json(respuesta);
          return
      } 
      
       const pok = await Pokemon.findOne({ //peticion a la Bd
          where: { name }
       })
       
        const pokApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`) //peticion a la Api
       
        const toPoke = [pok ? pok : "El pokemon no está en la base de datos",{
          sprites:pokApi.data.sprites.back_default, 
          name: pokApi.data.name, 
          types:pokApi.data.types} ]
          
        res.json(toPoke)
        

    } catch (err) {
      res.status(404).send('Not found');
    }
  });
    
   


   router.get("/:idPokemon", async (req, res) => {
    const { idPokemon } = req.params;
  
    try {
      if (idPokemon.length < 5) {
        const detail = await pokemonDetail(idPokemon);
  
        detail
          ? res.status(200).send(detail)
          : res.status(404).send("Pokemon Not found");
      } else {
        const pokemon = await Pokemon.findOne({
          where: { id: idPokemon },
          include: {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
  
        const pokemonId = {
          id: pokemon.dataValues.id,
          name: pokemon.dataValues.name,
          hp: pokemon.dataValues.hp,
          attack: pokemon.dataValues.attack,
          defense: pokemon.dataValues.defense,
          speed: pokemon.dataValues.speed,
          height: pokemon.dataValues.height,
          weight: pokemon.dataValues.weight,
          sprite: "https://giphy.com/gifs/reaction-mood-8UGGp7rQvfhe63HrFq",
          types: pokemon.dataValues.Types.map((el) => el.name),
        };
  
        pokemonId.id
          ? res.status(200).send(pokemonId)
          : res.status(404).send("Pokemon Not Found");
      }
    } catch (err) {
      console.log(err);
      return {};
    }
  });
  

   /* router.get('/:id', async (req, res) => {
       const id = req.params.id; // es lo mismo que hacer const {id} = req.params (este es estructurado)
       const pokemonsTotal = await getAllPokemons() // le estoy diciendo :  dentro de todos esos pokemones
       if(id) {                                //filtrame el que tenga el id que te estoy pasando
           const pokemonId = await pokemonsTotal.filter(obj => obj.id === id)
           pokemonId.length ? // si encuentra el id entra al 200, sino al 400
           res.status(200).json(pokemonId):
           res.status(404).send('Pokemon id not found')
       }
   }) */
   
   

   router.post("/", async (req, res) => {
    try {
      const {name, hp, attack, defense, speed, height, weight, type, createdInDb} = req.body;
  
      if (!name) return res.status(404).send("Name is a mandatory!");
  
      let pokemonCreated = await Pokemon.create({
        name: name.trim(),
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdInDb,
      });
      // let typeDb = await Type.findAll({
      //   where: { name: type },
      // });
         pokemonCreated.addType(type);
 
      res.status(200).send("Pokemon created successfully");
    } catch (err) {
      res.status(404).send('Not found');
    }
  }); 


  /*  router.post('/', async (req, res) => {
       //hago el post con todo lo que me va a llegar por body
       const { name, hp, attack, defense, speed, height, weight, sprite, createInDb, types} = req.body;
       
       //creo el personaje con todo esto
       const pokemonCreated = await Pokemon.create({
            name, hp, attack, defense, speed, height, weight, sprite, createInDb }) // aca no va types xq hago la relacion aparte
       
        // encontrame en el Type todos los types que yo le estoy pasando por body
       const typeDb = await Type.findAll({ where: { name: types } }) 
            pokemonCreated.addType(typeDb) //addType es un metodo de sequelize , que me trae de la tabla Type lo que le paso(typeDb)
            res.send('Pokemon successfully created');
            
   }); */
   

   module.exports = router;