const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('type', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};// no creo el id , porque no voy a tener otro tipo de datos mas que nombre y id...entonces
// como ya los tengo en la base de datos me lo genera solo el id...