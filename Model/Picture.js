var Sequelize = require("sequelize")
var Database = require("./Database")

var Picture = Database.define("picture", {
	itemId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	bytes: {
		type: Sequelize.BLOB,
		allowNull: false
	}
})

module.exports = Picture