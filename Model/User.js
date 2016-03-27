var Sequelize = require("sequelize")
var Database = require("./Database")

User = Database.define("user", {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	reputation: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	maximumItemsAmount: {
		type: Sequelize.INTEGER,
		defaultValue: 5,
		allowNull: false
	},
})

module.exports = User

