const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Pokemon, Type } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//Me traigo los datos de los pokemones de la api
const getApiInfo = async () => { //me TRAIGO LA INFO de la API
     const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon") // uso async await xq uno nunca sabe cuanto va a demorar la respuesta,
                                //entonces tengo que avisarle que tiene que esperar a la respuesta 
                                // antes de agregar informacion a la api url --- trabajo de manera asincrona.
    
    const apiInfo = await apiUrl.data.map(obj => {  // me va a traer la info en un .data
        return {                                   //lo mapeo para traerme solo esa info(name,heigth,weight etc)
            id: obj.id,                             // le digo devolveme solamente lo que yo necesito del back para mi aplicacion
            name: obj.name,                         // que en este caso seria todo lo que me piden en el readme
            hp: obj.stats[1].base_stat,
            attack: obj.stats[2].base_stat,
            defense: obj.stats[3].base_stat,
            speed: obj.stats[6].base_stat,
            height: obj.height,
            weight: obj.weight,          
            types: obj.types.map(obj => obj),      // aca mapeo para que me traiga todos los tipos                     
       
        }
    })
    return apiInfo;
};


//Me traigo los datos de los pokemones de la Base de Datos
const getDbInfo = async () => { // me TRAIGO LA INFO de mi Base de Datos.
    return await Pokemon.findAll({
        include: { 
            model: Type,
            attributes: ['name'], //traigo solo name xq el ID me lo trae junto al name solo.
            through: {           // le digo traeme el nombre del tipo de un determinado pokemon (agua,fuego ,aire etc)
                attributes: [], //el through significa : traeme el name "mediante los atributos" es una 
                                //comprobacion que se hace siempre cuando me quiero traer una tributo
            },
        } 
    })

}
// Concateno los datos de los pokemons de la API con los de la Base de Datos
const getAllPokemon = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


// RUTAS
router.get('/pokemons', async (req, res) =>{
 const name = req.query.name // busco si hay una propiedad llamada name en el query y me lo guardo en esa constante
 const pokemonsTotal = await getAllPokemon();
 if(name) {                     //en filter le digo agarra ese nombre y fijate si incluye lo que yo le pase por query, que es "name"
     const pokemonName = await pokemonsTotal.filter(obj => obj.name.toLowerCase().includes(name.toLowerCase())) //obj.name es el nombre del pokemon que me va a venir
     pokemonName.length ? // aca pregunto, encontraste algo aca? (es todo el filtrado de arriba)
     res.status(200).send(pokemonName) :    //toLowerCase lo deja preparado para pasar todo a minuscula ...                                              
     res.status(404).send('Pokemon name not found');  //me arregla para que si en la api esta en mayuscula , 
    } else {                                       //me lo deje en minuscula y este igual a la base de datos
        res.status(200).send(pokemonsTotal); //en este caso es cuando no hay un query entonces hace esto.
    }                                                                                
}) 
 

router.get('/types', async (req, res) =>{ // me traigo de la api a mi base de datos para trbajar directamente desde ahi
    const typesApi = await axios.get("https://pokeapi.co/api/v2/type") // me traigo desde la api
    const types = typesApi.data.map(obj => obj.type) // este mapeo me va a devolver muchos arreglos 
    const typEach = types.map(obj => { // entonces hago un 2do map y tengo que ingresar a cada uno de esos arreglos
        for (let i = 0; i < obj.length; i++) return obj[i]}) // lo recorro con un for, y le digo devolveme cada elemento dentro de esos arreglos en i
       
        typEach.forEach(obj => { // para cada uno de esos elementos
          Type.findOrCreate({ //entra a mi modelo Tipo y busca: si no esta lo crea, y si esta no crea nada, no lo vuelve a generar.
                where: { name : obj } // donde el nombre sea este elemento que te estoy mapeando
          })  
        }); 
        const allTypes = await Type.findAll(); // me guarda todos los Tipos en esta constante y dice
        res.send(allTypes); // entra a Tipo y mandamelos para aca
})

router.post('/pokemons', async (req, res) => {
    //hago el post con todo lo que me va a llegar por body
    const { name, hp, attack, defense, speed, height, weight, createInDb, types} = req.body;
    
    //creo el personaje con todo esto
    const pokemonCreated = await Pokemon.create({
         name, hp, attack, defense, speed, height, weight, createInDb }) // aca no va types xq hago la relacion aparte
    
     // encontrame en el Type todos los types que yo le estoy pasando por body
    const typeDb = await Type.findAll({ where: { name: types } }) 
         pokemonCreated.addType(typeDb) //addType es un metodo de sequelize , que me trae de la tabla Type lo que le paso(typeDb)
         res.send('Pokemon created successfully')
});

router.get('/:id}', async (req, res) => {
    const id = req.params.id; // es lo mismo que hacer const {id} = req.params (este es estructurado)
    const pokemonsTotal = await getAllPokemon() // le estoy diciendo :  dentro de todos esos pokemones
    if(id) {                                //filtrame el que tenga el id que te estoy pasando
        const pokemonId = await pokemonsTotal.filter(obj => obj.id === id)
        pokemonId.length ? // si encuentra el id entra al 200, sino al 400
        res.status(200).json(pokemonId):
        res.status(404).send('Pokemon id not found')
    }
})

module.exports = router;
