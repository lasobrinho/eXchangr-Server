var events = require('./UserRegistrationEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes) {
        var User = database.models.user
        socket.on(events.in, function(data) {
            User.create({
                name: data.user.name,
                email: data.user.email,
                password: data.user.password
            }).then(function(user) {
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
