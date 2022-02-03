const { Router } = require('express');
const pokemons = require("./pokemons.js");
const types = require("./types.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


router.use("/pokemons", pokemons);

router.use("/types", types);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
