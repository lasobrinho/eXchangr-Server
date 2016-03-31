module.exports = function(sequelize, DataTypes) {
    return sequelize.define("chat", {
        firstUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        secondUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}
