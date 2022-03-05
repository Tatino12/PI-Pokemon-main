const { Router } = require("express");
const router = Router();

const {Type} = require('../db');
const axios = require("axios");


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