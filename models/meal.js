'use strict';
module.exports = (sequelize, DataTypes) => {
    const meal = sequelize.define('meal', {
        day: DataTypes.STRING,
        time: DataTypes.STRING,
        name: DataTypes.STRING,
        image: DataTypes.STRING
    }, {});
    meal.associate = function(models) {
        // associations can be defined here
        models.meal.belongsToMany(models.plan, { through: "mealplan" })
    };
    return meal;
};