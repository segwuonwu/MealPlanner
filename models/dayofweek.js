'use strict';
module.exports = (sequelize, DataTypes) => {
    const dayofweek = sequelize.define('dayofweek', {
        name: DataTypes.STRING,
        time: DataTypes.STRING,
        menuId: DataTypes.INTEGER
    }, {});
    dayofweek.associate = function(models) {
        // associations can be defined here
        models.dayofweek.hasMany(models.menu);
        models.dayofweek.hasMany(models.user);
    };
    return dayofweek;
};