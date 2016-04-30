var events = require('./ItemBrowsingEvents')
var DistanceModule = require('../DistanceModule')

var maximumDistanceInMiles = 10

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Coordinates = database.models.coordinates
        var Item = database.models.item
        var Picture = database.models.picture
        var Reaction = database.models.reaction

        socket.on(events.in, function(data) {
            var auth_user = null
            User.findById(data.user.id, {
                include: Coordinates
            }).then(function(user) {
                if (user != null) {
                    auth_user = user
                    Item.findAll({  
                        include: [
                            {
                                model: Reaction,
                                required:  false,
                            },
                            {
                                model: Picture
                            },
                            {
                                model: User,
                                attributes: ['id'],
                                include: [{
                                    model: Coordinates,
                                    attributes: ['latitude', 'longitude']
                                }]
                            }
                        ],
                        where: {
                            $and: [
                                {
                                    userId: {
                                        $ne: data.user.id
                                    }
                                },
                                {
                                    '$reactions.userId$': {
                                        $or: [{$ne: data.user.id}, null]
                                    }
                                },
                                {
                                    active: true
                                }
                            ]
                        }
                    }).then(function(eligibleItems) {
                        var items = []
                        eligibleItems.forEach(function(eligibleItem) {
                            var potentialItem = eligibleItem.get({plain: true})
                            var distance = DistanceModule.distanceInMiles(potentialItem.user.coordinate, user.coordinate)
                            if(distance < maximumDistanceInMiles) {
                                items.push(potentialItem)
                            }
                        })

                        socket.emit(events.out, {
                            items: items,
                            responseCode: responseCodes.success
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
