var BlockedUser = require("./BlockedUser")
var Chat = require("./Chat")
var Item = require("./Item")
var Location = require("./Location")
var Message = require("./Message")
var Picture = require("./Picture")
var Reaction = require("./Reaction")
var Statistic = require("./Statistic")
var User = require("./User")


Item.hasMany(Reaction)
Item.belongsTo(User)
Item.hasMany(Picture)

Chat.hasMany(Message)

User.hasMany(BlockedUser)
User.hasOne(Location)
User.hasOne(Statistic)
User.hasMany(Item)
User.hasMany(Reaction)
User.hasMany(Message)


var createDB = require("./CreateDB")
createDB()

module.exports = {
	blockedUser: BlockedUser,
	chat: Chat,
	item: Item,
	location: Location,
	message: Message,
	reaction: Reaction,
	statistic: Statistic,
	user: User
}