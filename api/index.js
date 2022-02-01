//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => { // el force true cada vez que yo corto el back, va a borrar toda la BD y cuando vuelva a levantar el back lo vuelve a generar denuevo
  server.listen(3001, () => { //en cambio si el force: false, cada vez que levante la BD , se va a crear todo el tiempo si tuviera el CREATE (en index linea 71), por eso le pongo un findOrCreate( que si no esta, lo crea y listo)
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
