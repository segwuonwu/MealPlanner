'use strict';
module.exports = (sequelize, DataTypes) => {
  const mealplan = sequelize.define('mealplan', {
    mealId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER
  }, {});
  mealplan.associate = function(models) {
    // associations can be defined here
  };
  return mealplan;
};