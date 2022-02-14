const { Router } = require("express");
const router = Router();

const {Type} = require('../db');
const axios = require("axios");


router.get("/", async (req, res) => { // me traigo de la api a mi base de datos para trbajar directamente desde ahi
  const infoTypes = await axios.get("https://pokeapi.co/api/v2/type"); // me traigo desde la api
  const data = infoTypes.data.results;

  data.forEach((el) => { // para cada uno de esos elementos
    Type.findOrCreate({ //entra a mi modelo Tipo y busca: si no esta lo crea, y si esta no crea nada, no lo vuelve a generar.
      where: {
        name: el.name, // donde el nombre sea este elemento 
      },
    });
  });

  const infoTypesDb = await Type.findAll(); // me guarda todos los Tipos en esta constante y dice
  
  
  res.status(200).json(infoTypesDb); // entra a infoTipos de la base de datos y mandamelos para aca
});

module.exports = router;