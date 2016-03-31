var Sequelize = require('sequelize')
var database = new Sequelize('eXchangr', 'root', 'root')

BlockedUser = database.import(__dirname + '/../Model/BlockedUser')
Chat = database.import(__dirname + '/../Model/Chat')
Item = database.import(__dirname + '/../Model/Item')
Coordinates = database.import(__dirname + '/../Model/Coordinates')
Message = database.import(__dirname + '/../Model/Message')
Picture = database.import(__dirname + '/../Model/Picture')
Reaction = database.import(__dirname + '/../Model/Reaction')
Statistic = database.import(__dirname + '/../Model/Statistic')
User = database.import(__dirname + '/../Model/User')

User.hasMany(BlockedUser)
User.hasMany(Item)
User.hasMany(Message)
User.hasMany(Reaction)
User.hasOne(Coordinates)
User.hasOne(Statistic)

Item.hasMany(Picture)
Item.hasMany(Reaction)
Item.belongsTo(User)

Chat.hasMany(Message)

Message.belongsTo(Chat)
Message.belongsTo(User)

module.exports = database
