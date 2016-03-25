var Sequelize = require("sequelize")
var Database = require("./Database")

var Statistic = Database.define("statistic", {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	numberOfExchanges: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	numberOfMatches: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0	
	},
	numberOfFailedExchanges: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	numberOfLikesGiven: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	}
})

module.exports = Statistic