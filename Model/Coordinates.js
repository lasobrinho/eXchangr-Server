module.exports = function(sequelize, DataTypes) {
    return sequelize.define('coordinates', {
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
    })
}
