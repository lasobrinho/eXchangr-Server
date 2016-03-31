module.exports = function(sequelize, DataTypes) {
    return sequelize.define("statistic", {
        numberOfExchanges: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        numberOfMatches: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        numberOfFailedExchanges: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        numberOfLikesGiven: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })
}
