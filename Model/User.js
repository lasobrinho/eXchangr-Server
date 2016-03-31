module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reputation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        maximumItemsAmount: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
            allowNull: false
        },
    })
}
