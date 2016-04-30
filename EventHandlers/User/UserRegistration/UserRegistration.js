var events = require('./UserRegistrationEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Coordinates = database.models.coordinates
        socket.on(events.in, function(data) {
            var coordinates = null
            if (data.coordinates == null) {
                coordinates = {
                    latitude: 0,
                    longitude: 0
                }
            }
            console.log(coordinates)
            User.create({
                name: data.user.name,
                email: data.user.email,
                password: data.user.password,
                phone: data.user.phone,
                coordinate: coordinates
            }, {include: Coordinates}).then(function(user) {
                console.log(JSON.stringify(user))
                socket.emit(events.out, {
                    responseCode: responseCodes.success,
                    user: user.get({
                        plain: true
                    })
                })
            }).catch(function(error) {
                socket.emit(events.out, {
                    responseCode: responseCodes.internalError,
                    message: error.message
                })
            })
        })
    }
}
