var Sequelize = require("sequelize")
var Database = require("./Database")

Chat = Database.define("chat", {
	firstUserId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	secondUserId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})



module.exports = Chat