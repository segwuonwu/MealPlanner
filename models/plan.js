'use strict';
module.exports = (sequelize, DataTypes) => {
    const plan = sequelize.define('plan', {
        name: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {});
    plan.associate = function(models) {
        // associations can be defined here
        models.plan.belongsTo(models.user);
        models.plan.belongsToMany(models.meal, { through: "mealplan" })
    };
    return plan;
};