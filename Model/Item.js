var Sequelize = require("sequelize")
var Database = require("./Database")

Item = Database.define("item", {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	}
})

module.exports = Item
