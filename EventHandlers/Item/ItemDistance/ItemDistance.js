var events = require('./ItemDistanceEvents')

function calculateDistance(coordinate1, coordinate2) {
    var R = 3959 // miles
    var fi_1 = coordinate1.latitude * Math.PI/180
    var fi_2 = coordinate2.latitude *  Math.PI/180
    var delta_fi_ = (coordinate2.latitude-coordinate1.latitude) * Math.PI/180
    var delta_epsilon = (coordinate2.longitude-coordinate1.longitude) * Math.PI/180

    var a = Math.sin(delta_fi_/2) * Math.sin(delta_fi_/2) + Math.cos(fi_1) * Math.cos(fi_2) * Math.sin(delta_epsilon/2) * Math.sin(delta_epsilon/2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    
    var d = R * c
    return Math.round(d * 100) / 100
}

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
                                distance: calculateDistance(user.coordinate, item.user.coordinate)
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
