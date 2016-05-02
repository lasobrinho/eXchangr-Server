var events = require('./UpdateUserCoordinateEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        socket.on(events.in, function(data) {
            User.findById(data.user.id).then(function(user){
                if (user != null)  {
                    user.getCoordinate().then(function(coordinate) {
                        coordinate.update(data.user.coordinate).then(function() {
                            socket.emit(events.out, {
                                responseCode: responseCodes.success
                            })
                        })
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
