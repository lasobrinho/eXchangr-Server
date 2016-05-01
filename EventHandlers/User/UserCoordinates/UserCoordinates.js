var events = require('./userCoordinatesEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Coordinates = database.models.coordinates
        socket.on(events.in, function(data) {
            User.find({
                where: {
                    id: data.user.id
                },
                include: Coordinates
            }).then(function(user) {
                user = user.get({plain: true})
                if (user != null) {
                    Coordinates.findOne({
                        where: {
                            userId: user.id
                        }
                    }).then(function(coordinates) {
                        socket.emit(events.out, {
                            responseCode: responseCodes.success,
                            coordinates: coordinates
                        })
                    })
                } else {
                    throw new Error('Access Denied')
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
