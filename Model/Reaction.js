module.exports = function(sequelize, DataTypes) {
    return sequelize.define('reaction', {
        interested: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}
