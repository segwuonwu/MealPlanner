'use strict';
module.exports = (sequelize, DataTypes) => {
    const menu = sequelize.define('menu', {
        name: DataTypes.STRING
    }, {});
    menu.associate = function(models) {
        // associations can be defined here
        models.menu.belongsTo(models.dayofweek);
    };
    return menu;
};