var Sequelize = require("sequelize")
var Database = require("./Database")

Chat = Database.define("chat", {
	firstUserId: Sequelize.INTEGER,
	secondUserId: Sequelize.INTEGER,
	messageId: Sequelize.INTEGER
})



module.exports = Chat