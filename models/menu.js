'use strict';
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
    name: DataTypes.STRING
  }, {});
  menu.associate = function(models) {
    // associations can be defined here
  };
  return menu;
};