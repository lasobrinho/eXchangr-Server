var Sequelize = require("sequelize")
var Database = require("./Database")

var Reaction = Database.define("reaction", {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	itemId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	interested: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
})

module.exports = Reaction