module.exports = function(sequelize, DataTypes) {
    return sequelize.define('message', {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
}
