var BlockedUser = require("./BlockedUser")
var Chat = require("./Chat")
var Item = require("./Item")
var Location = require("./Location")
var Message = require("./Message")
var Picture = require("./Picture")
var Reaction = require("./Reaction")
var Statistic = require("./Statistic")
var User = require("./User")


module.exports = function() {
	User.sync()
	Chat.sync()
	Message.sync()
	BlockedUser.sync()
	Statistic.sync()
	Item.sync()
	Reaction.sync()
	Picture.sync()
}
