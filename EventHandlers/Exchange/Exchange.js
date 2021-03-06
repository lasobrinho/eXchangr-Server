var events = require('./ExchangeEvents')
var DistanceModule = require('../Item/DistanceModule')

function convertToArray(object) {
    return Object.keys(object).map(function(key) {
        return object[key]
    })
}

function prepareExchanges(exchanges) {
    result = []
    exchanges = convertToArray(exchanges)
    exchanges.forEach(function(exchange) {
        exchange.itemsLikedByTheOtherUser = convertToArray(exchange.itemsLikedByTheOtherUser)
        exchange.otherUserItemsThatILike = convertToArray(exchange.otherUserItemsThatILike)
        result.push(exchange)
    })
    return result
}

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Item = database.models.item
        var Reaction = database.models.reaction
        var Coordinates = database.models.coordinates
        var Picture = database.models.picture

        socket.on(events.in, function(data) {
            User.findOne({
                where: {
                    id: data.user.id,
                },
                include: Coordinates
            }).then(function(user) {
                if (user != null) {
                    user.getReactions({
                        include: [
                            {
                                model: Item,
                                where: {
                                    active: true
                                },
                                include: [Picture, {
                                    model: User,
                                    include: [Coordinates, {
                                        model: Reaction,
                                        where: {
                                            interested: true
                                        },
                                        include: {
                                            model: Item,
                                            include: Picture
                                        }
                                    }]
                                }]
                            }
                        ],
                        where: {
                            interested: true,
                            '$item.user.reactions.item.userId$': data.user.id
                        }
                    }).then(function(reactions) {
                        var exchanges = {}
                        reactions.forEach(function(myReaction) {
                            var exchangeKey = user.id + '_' + myReaction.item.user.id
                            if(exchanges[exchangeKey] == null) {
                                var otherUser = myReaction.item.user.get({plain: true})
                                exchanges[exchangeKey] = {
                                    otherUser: otherUser,
                                    distance: DistanceModule.distanceInMiles(user.coordinate, otherUser.coordinate),
                                    itemsLikedByTheOtherUser: {},
                                    otherUserItemsThatILike: {}
                                }
                            }

                            myReaction.item.user.reactions.forEach(function(otherUserReaction) {
                                if(otherUserReaction.item.userId == user.id) {
                                    exchanges[exchangeKey].itemsLikedByTheOtherUser[otherUserReaction.itemId] = otherUserReaction.item.get({plain: true})
                                    exchanges[exchangeKey].otherUserItemsThatILike[myReaction.itemId] = myReaction.item.get({plain: true})
                                }
                            })
                        })
                        
                        socket.emit(events.out, {
                            responseCode: 0,
                            exchanges: prepareExchanges(exchanges)
                        })

                    })
                } else {
                    socket.emit(events.out, {
                        responseCode: responseCodes.permissionDenied,
                        message: "Permission Denied"
                    })
                }
            }).catch(function(error) {
                socket.emit(events.out, {
                    responseCode: responseCodes.internalError,
                    message: error.message
                })
            })
        })
    }
}
