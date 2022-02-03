const { Router } = require("express");
const router = Router();

const {Type} = require('../db');
const axios = require("axios");




/* router.get('/', async (req, res) =>{ // me traigo de la api a mi base de datos para trbajar directamente desde ahi
    const typesApi = await axios.get("https://pokeapi.co/api/v2/type") // me traigo desde la api
    const types = typesApi.data.map(obj => obj.type) // este mapeo me va a devolver muchos arreglos 
    const typEach = types.map(obj => { // entonces hago un 2do map y tengo que ingresar a cada uno de esos arreglos
        for (let i = 0; i < obj.length; i++) return obj[i]}) // lo recorro con un for, y le digo devolveme cada elemento dentro de esos arreglos en i
       
        typEach.forEach(obj => { // para cada uno de esos elementos
          Type.findOrCreate({ //entra a mi modelo Tipo y busca: si no esta lo crea, y si esta no crea nada, no lo vuelve a generar.
                where: { name : obj.name } // donde el nombre sea este elemento que te estoy mapeando
          })  
        }); 
        const allTypes = await Type.findAll(); // me guarda todos los Tipos en esta constante y dice
       
        res.send(allTypes); // entra a Tipo y mandamelos para aca
}) */

router.get("/", async (req, res) => {
  const infoTypes = await axios.get("https://pokeapi.co/api/v2/type");
  const data = infoTypes.data.results;

  data.forEach((el) => {
    Type.findOrCreate({
      where: {
        name: el.name,
      },
    });
  });

  const infoTypesDb = await Type.findAll();
  
  res.status(200).json(infoTypesDb);
});

module.exports = router;