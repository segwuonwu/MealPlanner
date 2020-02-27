'use strict';
module.exports = (sequelize, DataTypes) => {
  const dayOfWeek = sequelize.define('dayOfWeek', {
    name: DataTypes.STRING,
    time: DataTypes.STRING,
    menuId: DataTypes.INTEGER
  }, {});
  dayOfWeek.associate = function(models) {
    // associations can be defined here
  };
  return dayOfWeek;
};