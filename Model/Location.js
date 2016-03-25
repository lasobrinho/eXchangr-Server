var Sequelize = require("sequelize")
var Database = require("./Database")

var Location = Database.define("location", {
	latitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	longitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

module.exports = Location