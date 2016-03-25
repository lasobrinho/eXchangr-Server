var Sequelize = require("sequelize")
var Database = require("./Database")

var BlockedUser = Database.define("blockeduser", {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	blockedUserId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

module.exports = BlockedUser