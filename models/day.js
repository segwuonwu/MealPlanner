'use strict';
module.exports = (sequelize, DataTypes) => {
    const day = sequelize.define('day', {
        day: DataTypes.STRING,
        mealId: DataTypes.INTEGER
    }, {});
    day.associate = function(models) {
        // associations can be defined here
        models.day.hasMany(models.time);
    };
    return day;
};