var Sequelize = require("sequelize")
var Database = require("./Database")

Message = Database.define("message", {
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	chatId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

module.exports = Message