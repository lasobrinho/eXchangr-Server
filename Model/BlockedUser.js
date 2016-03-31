module.exports = function(sequelize, DataTypes) {
    return sequelize.define('blockeduser', {
        blockedUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}
