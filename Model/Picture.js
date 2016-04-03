module.exports = function(sequelize, DataTypes) {
    return sequelize.define('picture', {
        bytes: {
            type: DataTypes.BLOB('long'),
            allowNull: false
        }
    })
}
