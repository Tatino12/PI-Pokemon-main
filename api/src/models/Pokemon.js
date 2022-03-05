const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull : true
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull : true
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull : true
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull : true
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull : true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull : true
    },
    sprite: {
      type: DataTypes.STRING,
      allowNull: true
    },
  
    createdInDb: { 
      type: DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue: true
    }
  });
};
