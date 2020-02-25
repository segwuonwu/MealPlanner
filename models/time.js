'use strict';
module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('time', {
        name: DataTypes.STRING,
        imgage: DataTypes.BLOB
    }, {});
    time.associate = function(models) {
        // associations can be defined here
        models.time.belongsTo(models.day);
    };
    return time;
};