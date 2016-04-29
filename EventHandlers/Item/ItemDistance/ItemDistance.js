var events = require('./ItemDistanceEvents')
var DistanceModule = require('../DistanceModule')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Item = database.models.item
        var Coordinates = database.models.coordinates
        socket.on(events.in, function(data) {
            User.findOne({
                where: {
                    id: data.user.id
                },   
                include: Coordinates
            }).then(function(user) {
                user = user.get({plain: true})
                if (user != null) {
                    Item.findOne({
                        where: {
                            id: data.item.id
                        },
                        include: {
                            model: User,
                            include: Coordinates
                        },
                        attributes: ['id']
                    }).then(function(item) {
                        if (item != null) {
                            item = item.get({plain: true})
                            console.log(item)
                            socket.emit(events.out, {
                                responseCode: responseCodes.success,
                                distance: DistanceModule.distanceInMiles(user.coordinate, item.user.coordinate)
                            })
                        } else {
                            throw Error('Could not find item')
                        }
                    })
                } else {
                    socket.emit(events.out, {
                        responseCode: responseCodes.permissionDenied,
                        message: 'Permission Denied'
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
