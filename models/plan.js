'use strict';
module.exports = (sequelize, DataTypes) => {
    const plan = sequelize.define('plan', {
        day: DataTypes.STRING,
        time: DataTypes.STRING,
        mealId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {});
    plan.associate = function(models) {
        // associations can be defined here
        models.plan.hasMany(models.meal);
        models.plan.belongsTo(models.user);
    };
    return plan;
};