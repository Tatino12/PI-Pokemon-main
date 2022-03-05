const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const { getAllPokemons, pokemonDetails } = require("../functions/functions.js");

const axios = require("axios").default;

const router = Router();



router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      const respuesta = await getAllPokemons();
      res.json(respuesta);
      return;
    }


    const pok = await Pokemon.findOne({  
      where: { name },
    });


    const pokApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`); 

    const toPoke = [
      pok ? pok : "El pokemon no está en la base de datos",
      {
        sprites: pokApi.data.sprites.back_default,
        name: pokApi.data.name,
        types: pokApi.data.types,
      },
    ];

    res.json(toPoke);
  } catch (err) {
    res.status(404).send("Not found");
  }
});

router.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  const [id, isDb] = idPokemon.split("+");
  try {
    if (isDb === "Db") {
      const pokemon = await Pokemon.findOne({
        where: { id: id },
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
        sprite: pokemon.dataValues.sprite,
        types: pokemon.dataValues.types.map((el) => el.name),
      };
      res.status(200).send(pokemonId);
    } else { 
      const detail = await pokemonDetails(id)
          res.status(200).send(detail)    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Pokemon Not Found");
  }
});


router.post("/", async (req, res) => {
  try {
    
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      sprite,
      createdInDb,
    } = req.body;

    if (!name) return res.status(404).send("Name is a mandatory!");

    let pokemonCreated = await Pokemon.create({
     
      name: name.trim(),
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      sprite, 
      createdInDb,
    });
    let typesDb = await  Type.findAll({
      where: { name: types},
    });
    
    const typeMap = typesDb.map((e) => e.dataValues.id)

    pokemonCreated.addType(typeMap);
    
    
    res.status(200).send("Pokemon created successfully");
  } catch (err) {
    res.status(404).send("Not found");
  }
}); 

module.exports = router;
