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
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reputation: {
            type: DataTypes.DOUBLE,
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
