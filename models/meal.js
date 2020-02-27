'use strict';
module.exports = (sequelize, DataTypes) => {
    const meal = sequelize.define('meal', {
        name: DataTypes.STRING,
        image: DataTypes.STRING
    }, {});
    meal.associate = function(models) {
        // associations can be defined here
        models.meal.belongsTo(models.plan);
    };
    return meal;
};