var Sequelize = require('sequelize')
var database = new Sequelize('eXchangr', 'root', 'root', {
    logging: false
})

var BlockedUser = database.import(__dirname + '/../Model/BlockedUser')
var Chat = database.import(__dirname + '/../Model/Chat')
var Item = database.import(__dirname + '/../Model/Item')
var Coordinates = database.import(__dirname + '/../Model/Coordinates')
var Message = database.import(__dirname + '/../Model/Message')
var Picture = database.import(__dirname + '/../Model/Picture')
var Reaction = database.import(__dirname + '/../Model/Reaction')
var Statistic = database.import(__dirname + '/../Model/Statistic')
var User = database.import(__dirname + '/../Model/User')

User.hasMany(BlockedUser)
User.hasMany(Item, {onDelete: 'CASCADE'})
User.hasMany(Message)
User.hasMany(Reaction, {onDelete: 'CASCADE'})
User.hasOne(Coordinates, {onDelete: 'CASCADE'})
User.hasOne(Statistic, {onDelete: 'CASCADE'})

Item.hasMany(Picture, {onDelete: 'CASCADE'})

Item.hasMany(Reaction, {onDelete: 'CASCADE'})
Item.belongsTo(User)

Chat.hasMany(Message)

Message.belongsTo(Chat)
Message.belongsTo(User)

Reaction.belongsTo(User)

module.exports = database
