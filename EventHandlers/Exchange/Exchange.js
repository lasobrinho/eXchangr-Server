var events = require('./ExchangeEvents')
var DistanceModule = require('../Item/DistanceModule')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Item = database.models.item
        var Reaction = database.models.reaction
        var Coordinates = database.models.coordinates

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
                                include: {
                                    model: User,
                                    attributes: ['id', 'name', 'phone'],
                                    include: [Coordinates, {
                                        model: Reaction,
                                        where: {
                                            interested: true
                                        },
                                        include: Item
                                    }]
                                }
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
                                    otherUser: {
                                        id: otherUser.id,
                                        name: otherUser.name,
                                        phone: otherUser.phone,
                                        coordinates: {
                                            latitude: otherUser.coordinate.latitude,
                                            longitude: otherUser.coordinate.longitude
                                        },
                                        distance: DistanceModule.distanceInMiles(user.coordinate, otherUser.coordinate)
                                    },
                                    itemsLikedByTheOtherUser: {},
                                    otherUserItemsThatILike: {}
                                }
                            }

                            myReaction.item.user.reactions.forEach(function(otherUserReaction) {
                                if(otherUserReaction.item.userId == user.id) {
                                    exchanges[exchangeKey].itemsLikedByTheOtherUser[otherUserReaction.itemId] = otherUserReaction.item
                                    exchanges[exchangeKey].otherUserItemsThatILike[myReaction.itemId] = myReaction.item
                                }
                            })
                        })

                        socket.emit(events.out, {
                            responseCode: 0,
                            exchanges: Object.keys(exchanges).map(function(key) {
                                return exchanges[key]
                            })
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
